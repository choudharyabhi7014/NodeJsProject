const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var productSchema = new Schema(
    {
        image: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        details: {
            type: String,
            required: true
        }
    }
)
module.exports=mongoose.model('ProductData',productSchema)