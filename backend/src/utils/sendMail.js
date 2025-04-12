
import nodemailer from "nodemailer";
import { forgetPasswordTemplate } from "./html/forgotPassword.js";
import { verifyEmailTemplate } from "./html/verifyEmailTemplate.js";
export const sendMail = async (to, subject, text, template) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: template(text),
    };
    const info = await transport.sendMail(mailOptions);
    return info;
}