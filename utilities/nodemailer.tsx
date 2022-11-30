const nodemailer = require("nodemailer");

const emailFrom = process.env.EMAIL_FROM;
const emailTo = process.env.EMAIL_TO;
const emailPW = process.env.PASSWORD;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailFrom,
        pass: emailPW,
    }
});

export const mailOptions = {
    from: emailFrom,
    to: emailTo,
}