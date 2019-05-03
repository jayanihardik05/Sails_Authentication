"use strict";
const nodemailer = require("nodemailer");

module.exports = {
    emailSend: async (req, res) => {
        const getUser = await user.findOne({ email: req.body.email });
        if (!getUser)
            return res.status(200).send({ status: false, message: "Email is Not Found" })
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
            html: "<b>Link is </b>"
        });
        transporter.verify(function (error, success) {
            if (error) {
                return res.status(200).send({ status: false, message: "Email is Not Found" })
            } else {
                return res.status(200).send({ status: true, message: "Forget password link send in your Email" })
            }
        });
    }

}

