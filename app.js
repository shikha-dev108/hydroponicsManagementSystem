const express = require('express');
const app = express();
const path= require('path');
const mongoose = require('mongoose');
const methodOverride= require('method-override');
const Crop=require('./models/cropModel');
const CropReading = require('./models/cropReadingModel');

mongoose.connect('mongodb://localhost:27017/hydroponics',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then((db)=>{
    console.log('Connected to MongoDB!!');
    console.log(mongoose.models)
    })
.catch((err)=>{
console.error('Failed to connect to MongoDB!!',err);
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// Middleware to parse url encoded data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// ROUTES

app.get('/', async (req, res) => {
    try {
        // Fetch crops from the database
        const crops = await Crop.find(); 
        console.log('Crops:', crops);

        // Pass the crops data to the EJS template
        res.render('home', { crops }); 
    } catch (error) {
        console.error('Error fetching crops:', error);
        res.status(500).send('Failed to fetch crops. Please try again.');
    }
});

app.get('/addCrop',(req,res)=>{
    res.render('crops/addCropForm');
})

app.post('/addCrop',async (req,res)=>{
    const {cropname, ph, temperature, ec} = req.body;

    const cropToBeSaved=new Crop({
        name:cropname,
        ph:ph,
        ec:ec,
        temperature:temperature
    })
   await cropToBeSaved.save(); 
    
   res.redirect('/');
   
})

app.get('/addCrop/:id',async (req,res)=>{
    const foundCrop= await Crop.findById(req.params.id);
    res.render('crops/show',{foundCrop});
})

app.get('/addCrop/:id/edit',async(req,res)=>{
    const foundCrop= await Crop.findById(req.params.id);
    res.render('crops/edit',{foundCrop});
}) 

app.put('/addCrop/:id',async(req,res)=>{
    console.log(req.body,req.params);
    
    const {id} = req.params;
    const updateCrop=await Crop.findByIdAndUpdate(id,req.body);
    console.log({updateCrop});
    
    res.redirect(`/addCrop/${id}`);
    
})


app.listen(3000,()=>{
    console.log("Serving on port 3000");
    
})







