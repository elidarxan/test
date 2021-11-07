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
    sale : {
        type : Number,
        default : 0
    } ,
    category : {
        type : String
    },
    comment : {
        type : String
    },
    img : {
        type : String ,
        default : "../public/images/no-image.png"
    },
    dataTime : {
        type : Date,
        default : Date.now
    },

})

module.exports = mongoose.model('mahsulot' , dbProduct)