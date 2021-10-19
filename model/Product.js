const mongoose = require('mongoose')
const schema = mongoose.Schema

const dbProduct  = new schema ( {
    title: {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    sale : Number,
    category : {
        type : String
    },
    comment : {
        type : String
    },
    img : {
        type : String
    },
    dataTime : {
        type : Date,
        default : Date.now
    },

})

module.exports = mongoose.model('mahsulot' , dbProduct)