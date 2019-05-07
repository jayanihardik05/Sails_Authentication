/**
 * RegistationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');
var fs = require('fs');

module.exports = {

    signup: (req, res) => {
        return res.view('registation/signup')
    },

    signupadd: async (req, res) => {
        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };

        const getUser = await user.findOne({ email: req.body.email });
        if (getUser)
            return res.status(200).send({ message: "Email is exist" });
        else
            bcrypt.hash(
                req.body.password,
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
                            status: "panding",
                            verifyToken: Math.random().toString(36).replace('0.', '')
                        };
                        user.create(data).then(results => {
                            const url = `${req.protocol}://${req.get('host')}/verify/link/${data.verifyToken}`;
                            let testAccount = nodemailer.createTestAccount();
                            let transporter = nodemailer.createTransport({
                                host: "smtp.gmail.com",
                                port: 465,
                                auth: {
                                    user: 'techlession@gmail.com',
                                    pass: 'Techlession@#123'
                                }
                            });
                            readHTMLFile(__dirname + '../../email/verify/veryfy.html', function (err, html) {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    url: url
                                };
                                var htmlToSend = template(replacements);
                                let info = transporter.sendMail({
                                    to: req.body.email,
                                    subject: "Account Verify",
                                    html: htmlToSend
                                    // html: "<b>Link is " + url + " </b>"
                                })
                            });
                            transporter.verify(function (error, success) {
                                if (error) {
                                    return res.status(200).send({ ResponseStatus: 1, message: "Email is Not Found" })
                                } else {
                                    return res.status(200).send({ ResponseStatus: 0, message: "sign up successful and Verify your Email First" })
                                }
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
        if (getUser.status === "panding")
            return res.status(200).send({ message: "Email is Not verify" })
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

    verifyAccount: async (req, res) => {
        data = {
            status: "veryfiy"
        }
        await user.updateOne({ verifyToken: req.params.id }, data)
        return res.view('registation/verifyAccount')
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
            return res.json({ status: true, message: "Data update successfully" });
        })
    }

};

