const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mailer.2334@gmail.com",
        pass: "Kushal@123",
    },
});

module.exports = transporter;