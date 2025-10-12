import nodemailer from "nodemailer";
import ejs from 'ejs';
import path from "path";
import dotenv from "dotenv"
import { fileURLToPath } from "url";
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMail = async (options) => {
  try {
    console.log('Creating mail transporter with service:', process.env.SMTP_SERVICE);
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // Add timeout settings
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000, // 10 seconds
      timeout: 10000
    });

    const { email, subject, template, data } = options;

    console.log('Verifying SMTP connection...');
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log('SMTP Verification Error:', error);
          reject(error);
        } else {
          console.log('SMTP Server is ready to take our messages');
          resolve(success);
        }
      });
    });

    const templatePath = path.join(__dirname, '../mails/', template);
    console.log('Rendering email template from:', templatePath);
    
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    console.log('Sending mail to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Mail sending failed:', error);
    throw error;
  }
};

export default sendMail;
