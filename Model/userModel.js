const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        cart: {
            type:Array,
            default : []
        }
    }
)
module.exports = mongoose.model('UserData', userSchema)