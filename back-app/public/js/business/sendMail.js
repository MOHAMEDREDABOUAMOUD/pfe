const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Remplacez par le service de messagerie que vous utilisez
    auth: {
        user: 'system.AlOmrane@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'systemAlOmrane', // Remplacez par votre mot de passe
    },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'system.alomrane@gmail.com',
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};

module.exports = sendEmail;
