import nodemailer from 'nodemailer'
import 'dotenv/config'


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const generateVerifyCode = () => {
    const codigo = Math.floor(10000 + Math.random() * 90000);
    return codigo.toString();
}

export const sendEmail = (email, codigo) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Código de verificación',
        text: `Su código de verificación de 5 números es: ${codigo}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado con éxito:', info.response);
        }
    });
}