var cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

const app = express();
app.use(cors());

const port = process.env.PORT || 8081

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const lastName = "Suico";
const firstName = "Lorenz Gil"

app.get('/', (req, res) => {
  res.send(`Hello ${lastName}, ${firstName}`);
});

app.post('/send-forgetpassword-email', (req, res) => {
  const { email } = req.body;

  const randomPassword = generateRandomPassword();

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'campuschime@gmail.com',
      pass: 'eald qvml yari ucjf'
    }
  });

  var mailOptions = {
    from: 'campuschime@gmail.com',
    to: email,
    subject: 'Your Account Password Reset',
    html: `
    <p>Dear ${email},</p>

    <p>This email is to confirm that a password reset request for your account has been received. To ensure the security of your account, a temporary system-generated password has been created for you.</p>
    
    <p>Your temporary password is: <span style="font-weight: bold;">${randomPassword}</span></p>
    
    <p>Please use this temporary password to log in to your account. We recommend changing your password immediately after logging in to something only you would know for enhanced security.</p>
    
    <p>If you did not initiate this password reset request or have any concerns, please contact our support team at <span style="font-weight: bold;">campuschime@gmail.com</span></p> for assistance.</p>
    
    <p>Thank you for your understanding and cooperation.</p>
    
    <p>Best regards,<br/>CampusChime</p>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});

function generateRandomPassword() {
  // Generate a random password using characters and length of your choice
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 10;
  let randomPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPassword += characters.charAt(randomIndex);
  }
  return randomPassword;
}

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});

