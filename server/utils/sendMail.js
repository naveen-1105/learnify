import { Resend } from "resend";
import ejs from 'ejs';
import path from "path";
import dotenv from "dotenv"
import { fileURLToPath } from "url";
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_KEY);

const sendMail = async (options) => {
  try {
    const { email, subject, template, data } = options;

    console.log("Rendering email template...");
    const templatePath = path.join(__dirname, "../mails/", template);
    const html = await ejs.renderFile(templatePath, data);

    console.log("Sending mail via Resend API...");
    const response = await resend.emails.send({
      from: "Learnify <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("Mail sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Mail sending failed:", error);
    throw error;
  }
};

export default sendMail;
