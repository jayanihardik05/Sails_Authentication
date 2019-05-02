/**
 * RegistationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

module.exports = {

    signup: (req, res) => {
        return res.view('registation/signup')
    },

    signupadd: async (req, res) => {
        const getUser = await user.findOne({ email: req.body.email });
        if (getUser)
            return res.status(200).send({ message: "Email is exist" });
        else
            bcrypt.hash(
                req.body.password && req.body.Confirmpassword,
                10,
                (err, hash) => {
                    if (err) {
                        return res.status(200).json({
                            message: "Not found"
                        });
                    } else {
                        var data = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            Confirmpassword: hash
                        };
                        user.create(data).then(results => {
                            return res.status(200).json({
                                ResponseStatus: 0,
                                message: "SingUp Sucessfull"
                            });
                        });
                    }
                }
            );
    },

    loginadd: async (req, res) => {
        const getUser = await user.findOne({ email: req.body.email });
        if (!getUser)
            return res.status(200).send({ message: "Email is Not Found" })
        else
            bcrypt.compare(req.body.password, getUser.password, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        message: "Enter valid Password"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        { id: getUser.id, email: getUser.email },
                        'SECRET_KEY',
                        {
                            expiresIn: 120000
                        }
                    );
                    return res.status(200).json({
                        ResponseStatus: 0,
                        message: "Sucefull",
                        token: token
                    });
                }
                res.status(200).json({
                    message: "Enter valid Password "
                });
            })
    },

    logindata: (req, res) => {
        user.find().exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/login', { registation: result })
        })
    },

    forgetpassword: (req, res) => {
        registation.find().exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/forgetpassword', { registation: result })
        })
    },


    listdata: async (req, res) => {
        registation.find().exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/registation', { registation: result })
        })
    },

    adddata: (req, res) => {
        registation.create(req.body).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    },
    editdata: (req, res) => {
        registation.findOne({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.view('registation/edit', { registation: result })
        })

    },
    deletedata: (req, res) => {
        registation.destroy({ id: req.params.id }).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    },
    updatedata: (req, res) => {
        registation.update({ _id: req.params.id }, req.body).exec((err, result) => {
            if (err) {
                res.send(500, { err: err })
            }
            res.redirect('/registation/listdata')
        })

    }
};

