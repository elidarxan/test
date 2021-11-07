const mongoose = require('mongoose')
const uri = ''
module.exports = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        })
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open' , function(){
            console.log('MongoDB connected global');
        })

    } catch (err) {
        throw err
    }
}


// ///// mongodb+srv://shokharbovdusov:0bWCk5ZPjejqjQss@cluster0.xs7gg.mongodb.net/myDB