"use strict";
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');

module.exports = {
    forgetpasswordlink: (req, res) => {
        return res.view('registation/forgetpasswordlink')
    },
    updateForgetPassword: (req, res) => {
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
                        password: hash
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
        const getUser = await user.findOne({ email: req.body.email });
        if (!getUser)
            return res.status(200).send({ status: false, message: "Email is Not Found" })
        const userId = getUser.id;
        const url = `${req.protocol}://${req.get('host')}/forgetpassword/link/${userId}`;
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: 'techlession@gmail.com',
                pass: 'Techlession@#123'
            }
        });
        let info = await transporter.sendMail({
            to: req.body.email,
            subject: "Forget_Password",
            html: "<b>Link is " + url + " </b>"
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

