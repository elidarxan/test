const express = require('express');
const dbProduct = require('../model/Product')
const md = require('../middlawre/verifed')
const fileFilter = require('../middlawre/fileUpload')
const toDelete = require('../middlawre/toDelete')
// console.log(upload);
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add', {
     title: 'Mahsulot qoshish sahifa',
     btn: "Joylashtirish"
    });
});

router.post('/' , fileFilter.single("img") , md ,   (req , res) => {
  console.log(req.file.filename);
  const db = new dbProduct({
    title : req.body.title,
    price : req.body.price,
    sale : req.body.sale,
    category : req.body.category,
    comment : req.body.comment,
    img : req.file.filename
  })
  db.save((err) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/')
    }
  })
})

/// Working one's card product method of GET

router.get('/product/:id' ,  (req  , res) => {
  dbProduct.findById(req.params.id , (err ,data) => {
    try {
      res.render("product" , {
        title: "Mahsulot haqida",
        data
      })
    } catch (error) {
      console.log(error);
    }
  })
})

/// Working one's card product EDIT method of GET

router.get('/update/:id' , (req , res) => {
  dbProduct.findById(req.params.id , (err ,data) => {
    try {
      res.render("add" , {
        title: "Mahsulot ozgartirish",
        data,
        btn : "O'zgartirish",
     
        
      })
    } catch (error) {
      console.log(error);
    }
  })
})

/// Working one's card product EDIT method of POST

router.post('/update/:id'  , fileFilter.single("img") , async (req , res) => {
  const user = req.body
  const img = await dbProduct.findById(req.params.id)
  const db = {
    title : req.body.title,
    price : req.body.price,
    comment : req.body.comment,
    category : req.body.category,
    img : req.file.filename,
  }
  
  if(req.file){
    user.img = req.file.filename
    toDelete(img.img)
  }else{
    user.img = img
  }
  try {
    const ids = {_id : req.params.id}
   await dbProduct.findByIdAndUpdate(ids , db)
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
})

/// Working one's card product DELETE method of GET

router.get('/delete/:id' ,  async (req , res) => {
  try {
    const img = await dbProduct.findById(req.params.id)
    const id = {_id : req.params.id}
    toDelete(img.img)
    await  dbProduct.findByIdAndDelete(id) 
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
  

})



module.exports = router;
