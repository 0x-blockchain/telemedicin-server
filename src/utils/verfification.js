const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hashToken = async (params) => {
  const token = await jwt.sign(
    {
      rand: params.random,
      email: params.email,
      token: params.token
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
  return token;
};

const transporter = {
    auth: {
        // Update the SendGrid API key here
        api_key: '###'
    }
}

const mailer = nodemailer.createTransport(sgTransport(transporter));

const sendConfirmationEmail = async (req, res) => {
    const { email, random, userToken} = req.body;

    const token = await hashToken({ random, email, token: userToken });
    const link = process.env.CLIENTURL + `/reset-password?token=${token}`;

    const data = {
        // Update the email here
        to: email,
        from: process.env.ADMINEMAIL,
        subject: type == "Forgot your password? It happends to the bet of us.",
        text: text,
        html: `
            <b>From:</b> ${process.env.ADMINEMAIL} <br /> 
            <b>Subject:</b> ${subject} <br /> 
            <b>Message:</b> Dear Telemedicine User,
                We have received your request to reset your password. Please click the link below to complete the reset<br />:
                ${link}<br />
                If you need additional assistance, or you did not make this change, please contact ${process.env.ADMINEMAIL}.
                Cheers,
                The Telemedicine Team` 
        
    };
    try {
        const response = await mailer.sendMail(data);
        console.log(response);
        return {
            state : true,
            token: token
        };
    } catch (error) {
        return false;
    }
    
}

const sendEmail = async (req, res) => {
    console.log(req.body)
    const {name, email, number, subject, text} = req.body;

    const data = {
        // Update the email here
        to: process.env.ADMINEMAIL,
        from: email,
        subject: 'Hi there',
        text: text,
        html: `
            <b>From:</b> ${name} <br /> 
            <b>Number:</b> ${number} <br /> 
            <b>Subject:</b> ${subject} <br /> 
            <b>Message:</b> ${text}
        ` 
    };
    try {
        const response = await mailer.sendMail(data);
        console.log(response)
        res.status(200).send("Email send successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error proccessing charge");
    }
}


module.exports = { sendEmail, sendConfirmationEmail };