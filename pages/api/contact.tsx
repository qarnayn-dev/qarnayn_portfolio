import type { NextApiHandler} from "next";
import { ContactHtmlTemplate } from "../../components/ContactHtmlTemplate";
import { mailOptions, transporter } from "../../utilities/nodemailer";

const handler: NextApiHandler = async (req,res) => {
    if (req.method === "POST") {
        const data = req.body;

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: `${data.name} – ${data.message.slice(0, 100)}...`,
                text: `Message from ${data.name} (${data.email})`,
                html: ContactHtmlTemplate({senderName: data.name, senderEmail: data.email, message: data.message,tags: data.tags})
            }).then(() => {
                return res.status(200).json({ "message": "Ok. Email has been sent." });
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({"message": error});
        }

    }
}

export default handler;