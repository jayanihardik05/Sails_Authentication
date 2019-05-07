"use strict";
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
var handlebars = require('handlebars');
var fs = require('fs');

module.exports = {

    forgetpasswordlink: (req, res) => {
        return res.view('registation/forgetpasswordlink')
    },

    updateForgetPassword: async (req, res) => {

        const getUser = await user.findOne({ forgetpasswordToken: req.params.getId });
        if (!getUser)
            return res.status(200).send({ status: false, message: " Your Email is Expired go to Forget PassWord link" })

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
                        password: hash,
                        forgetpasswordToken: Math.random().toString(36).replace('0.', '')
                    };
                    user.update({ _id: req.params.id }, data).exec((err, result) => {
                        if (err) {
                            res.send(500, { err: err })
                        } else { }
                        return res.json({ status: true, message: "Password update successfully" });
                    })
                }
            }
        );

    },

    emailSend: async (req, res) => {
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
        if (!getUser)
            return res.status(200).send({ status: false, message: "Email is Not Found" })
        const data = {
            forgetpasswordToken: Math.random().toString(36).replace('0.', '')
        }
        await user.updateOne({ email: req.body.email }, data)
        const userId = getUser.id;
        const url = `${req.protocol}://${req.get('host')}/forgetpassword/link/${data.forgetpasswordToken}`;
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: 'techlession@gmail.com',
                pass: 'Techlession@#123'
            }
        });
        readHTMLFile(__dirname + '../../email/verify/forgetPassword.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                url: url
            };
            var htmlToSend = template(replacements);
            let info =  transporter.sendMail({
                to: req.body.email,
                subject: "Forget_Password",
                html: htmlToSend
            })
        })
        transporter.verify(function (error, success) {
            if (error) {
                return res.status(200).send({ status: false, message: "Email is Not Found" })
            } else {
                return res.status(200).send({ status: true, message: "Forget password link send in your Email" })
            }
        });
    }
}

