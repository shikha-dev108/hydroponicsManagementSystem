const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropsSchema = new Schema(
    {
    name:{
        type: String,
        required: true,
        maxLength: 50
    },
    ph: {
        type: Number,
        required: true,
        min: 0,
        max: 14
    },
    ec: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true
    }

    }   
);

const CropModel= mongoose.model('crops', cropsSchema);

module.exports=CropModel;

