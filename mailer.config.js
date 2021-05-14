const nodemailer = require('nodemailer');

module.exports = (form) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mguelpa.clinica.online@gmail.com', // Cambialo por tu email
            pass: 'pfximmoassdafbtr' // Cambialo por tu password
        }
    });

    const mailOptions = {
        from: `${form.name} ${form.email}`,
        to: 'destinatario', // Cambia esta parte por el destinatario
        subject: form.subject,
        html: ` <strong>Nombre:</strong> ${form.name} <br/>
                <strong>E-mail:</strong> ${form.email} <br/>
                <strong>Mensaje:</strong> ${form.message}`};

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}