const express = require('express')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const userDb = require('../model/User');
const passport = require('passport');
const router = express.Router()


router.get('/', (req, res) => {
    res.render('register', {
        title: "Royhatdan otish",
    })
})

//

router.post("/", [
    check("names", "name kiriting").notEmpty(),
    check("surname", "familya kiriting").notEmpty(),
    check("login", "login kiriting").notEmpty(),
    check("password", "passport kiriting").notEmpty(),
    check("phone", "telefon kiriting").notEmpty(),
],
    async (req, res) => {
        if (req.body.password) {
            // console.log(req.body.password);
            await check("password2", "parol qaytadan kiriting")
                .equals(req.body.password)
                .notEmpty()
                .run(req)
        }

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render('register', {
                title: "Royhatdan otishda xatolik bor",
                errors: errors.array()
            })
        } else {
            try {
                const db = await new userDb({
                    names: req.body.names,
                    password: req.body.password,
                    phone: req.body.phone,
                    login: req.body.login,
                    surname: req.body.surname,
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(db.password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            db.password = hash
                            db.save((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    req.flash('success', "Registrsiydan otiz urra")
                                    res.redirect('/')
                                }

                            })
                        }
                    });
                });

            } catch (error) {
                console.log(error);
            }
        }
    })

    router.get('/login' , async (req , res) => {
        res.render("login" , {
            title: "tizimiga kirish"
        })
    })

    router.post('/login' , async (req , res , next) => {
        passport.authenticate('local' , {
            successRedirect: '/',
            failureRedirect: '/register/login',
            failureFlash : "login yoki parolda xatolik bor",
            successFlash: "xush kelibsiz" 
        })(req , res , next)
    })

    router.get('/logout' , (req , res) => {
        req.logout()
        req.flash('success' , "chiqib kettiz urra")
        res.redirect('/')
    })

module.exports = router