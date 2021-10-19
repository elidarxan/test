
const md = (req , res , next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        req.flash('danger' , "Iltimos tizimga kiring")
        res.redirect('/register/login')
    }
}

module.exports = md