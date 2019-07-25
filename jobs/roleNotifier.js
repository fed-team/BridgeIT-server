import { Role } from "../models";
import { roleNotifierMail } from "./templates";

export default async transporter => {

    if(!transporter)
        return;

    const inactiveRoles = await Role.find({ createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }});

    if(inactiveRoles.length === 0)
        return;

    const text = roleNotifierMail(inactiveRoles);
    const from = process.env.MAIL_EMAIL, to = process.env.NOTIFICATIONS_TARGET_MAIL, subject="New roles";

    transporter.sendMail({from, to, subject, text})
        .then(console.log("Sent new pending roles notifications"))
        .catch(console.error);

}