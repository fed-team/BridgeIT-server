import { Role } from "../models";
import { roleNotifierMail } from "./templates";

export default async transporter => {

    if(!transporter)
        return;

    const inactiveRoles = await Role.find({newlyAdded: true});

    if(inactiveRoles.length === 0)
        return;

    await Role.updateMany({}, {$unset: {newlyAdded: true}});

    const text = roleNotifierMail(inactiveRoles);
    const from = process.env.MAIL_EMAIL, to = process.env.NOTIFICATIONS_TARGET_MAIL, subject="New roles";

    transporter.sendMail({from, to, subject, text})
        .then(console.log("Sent new pending roles notifications"))
        .catch(console.error);

}