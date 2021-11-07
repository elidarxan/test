var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/product', function(req, res, next) {
  dbUser.find({} , (err , data) => {
    try {
      res.render('product', { 
        title: 'product',
        db : data 

      });
    } catch (err) {
        console.log(err);
    }
  })
 
});

router.get('/add/product/:id' ,  (req  , res) => {
  dbUser.findById(req.params.id , (err ,data) => {
    try {
      res.render("product" , {
        title: "Mahsulot haqida",
        data
        
      })
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  })
})


module.exports = router;
