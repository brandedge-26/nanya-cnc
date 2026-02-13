import nodemailer from "nodemailer";
import { ENV } from "./env.js";
import { welcomeTemplate } from "../email/welcomeTemplate.js";


export const sendEmail = async (options) => {

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ENV.SENDER_EMAIL,
            pass: ENV.SENDER_PASS
        },
    });

    // Define male options
    const mailOptions = {
        from: `"NANYA CNC" <${ENV.SENDER_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: welcomeTemplate(options.name),
    };

    // Send email
    await transporter.sendMail(mailOptions);
};