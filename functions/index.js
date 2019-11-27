const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin")
admin.initializeApp()

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'mail.seazoobd.com',
    port: 26,
    secure: false,
    auth: {
        user: 'mahfuz@seazoobd.com',
        pass: 'seazoobd2018'
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html
    };
    return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            return res.send(error.toString());
        }
        var resData = JSON.stringify(data)
        return res.send(`Sent! ${resData}`);
    });
});
