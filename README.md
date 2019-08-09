**Live Demo**: https://bridgeit-server.bridgeit-server.now.sh

*ENVIRONMENT VARIABLES:
- mongo_url - reference to mongoDB host
- e-mail service - will be used to send notifications to admins etc.
    * MAIL_EMAIL - the sender e-mail
    * MAIL_PASSWORD - plain-text password of the e-mail account
    * ADMIN_EMAILS - self explanatory, **is in the config.js file**
    * MAIL_HOST - IP adress or domain name of SMTP provider of said email
    * MAIL_SERVICE - name of the e-mail service provider as specified in nodemailer documentation  
    ######MAIL_HOST and MAIL_SERVICE are interchangeable, and only one is needed, if 2 of them are provided, MAIL_SERVICE is used
    
