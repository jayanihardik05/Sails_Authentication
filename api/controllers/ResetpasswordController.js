const nodemailer = require("nodemailer");

module.exports = {
    emailSend: (req, res) => {
        "use strict";
        const nodemailer = require("nodemailer");
        async function main() {
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
                to: req.body.to,
                subject: "Hello ✔",
                text: "Hello world?",
                html: "<b>Hello world?</b>"
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Sucesfull");
                }
            });
        }
        main().catch(console.error);

    }
}

