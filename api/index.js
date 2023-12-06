const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "campuschime"
});

const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const lastName = "Suico";
const firstName = "Lorenz Gil";

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
      pass: 'eald qvml yari ucjf',
    },
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
      return res.status(500).json({ error: "Error sending email." });
    } else {
      console.log('Email sent: ' + info.response);
      // Move the password update logic outside the email sending block
      updatePassword(req.body.email, randomPassword, res);
    }
  });
});

function updatePassword(email, plainPassword, res) {
  console.log("Received update request for email:", email);

  const hashedPassword = bcrypt.hashSync(plainPassword, 10); // Hash the password with a salt factor of 10

  const query = "UPDATE users SET password=? WHERE email=?";
  const values = [hashedPassword, email];

  console.log("SQL Query:", query);
  console.log("SQL Values:", values);

  database.query(query, values, (err, result) => {
    if (err) {
      console.error("Error in SQL query:", err);
      return res.status(500).json({ error: "Error updating password." });
    }

    console.log("Password updated:", result);

    if (result.affectedRows > 0) {
      return res.json({ message: "Password Updated!" });
    } else {
      return res.json({ message: "No password updated." });
    }
  });
}

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
