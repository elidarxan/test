const express = require('express');
const dbProduct = require('../model/Product')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  dbProduct.find({} , (err , data) => {
    try {
      res.render('card', { 
        title: 'Bosh sahifa',
        db : data 

      });
    } catch (err) {
        console.log(err);
    }
  })
 
});

module.exports = router;
