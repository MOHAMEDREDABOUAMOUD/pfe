const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'kevin.tillman16@ethereal.email', // Remplacez par votre adresse e-mail
        pass: 'mWj72cJD9HUdnvX3am', // Remplacez par votre mot de passe
    },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'system.alomrane@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: "<b>Send mail</b>", // html body
          });
        console.log('Email sent: ', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};

module.exports = sendEmail;
