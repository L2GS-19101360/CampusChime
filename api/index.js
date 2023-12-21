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

app.post('/account-registered', (req, res) => {
  const { email, lastName, firstName, contactNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'campuschime@gmail.com',
      pass: 'eald qvml yari ucjf',
    },
  });

  const activationLink = `http://localhost:8081/activate-account/${encodeURIComponent(email)}`;

  const mailOptions = {
    from: 'campuschime@gmail.com',
    to: email,
    subject: 'Account Registration',
    html: `
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for registering an account with Campus Chime!</p>
      <p>Your registration was successful, and you are now part of our community.</p>
      <p>Here are the details we have on file:</p>
      <ul>
        <li>Last Name: ${lastName}</li>
        <li>First Name: ${firstName}</li>
        <li>Contact Number: ${contactNumber}</li>
        <li>Email: ${email}</li>
      </ul>
      <p>To activate your account on our website, please click the link below:</p>
      <a href="${activationLink}" style="text-decoration: none;">
        <button type="button" style="background-color: #28a745; color: #fff; border: 1px solid #218838; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Confirm Account</button>
      </a>
      <p>If you have any questions or need assistance, feel free to contact us.</p>
      <br>
      <p>Best regards,</p>
      <p>The Campus Chime Team</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.get('/activate-account/:email', (req, res) => {
  const { email } = req.params;

  // TODO: Add logic to activate the user's account in your database
  // You may need to update the user status or perform other necessary actions

  const query = "UPDATE users SET active_status=1 WHERE email=?";
  const values = [email];

  console.log("SQL Query:", query);
  console.log("SQL Values:", values);

  database.query(query, values, (err, result) => {
    if (err) {
      console.error("Error in SQL query:", err);
      return res.status(500).json({ error: "Error updating active status." });
    }

    console.log("Active status updated:", result);

    if (result.affectedRows > 0) {
      // Send a response with a script for client-side redirection
      const redirectScript = `
        <script>
          alert('Account activated successfully!');
          window.location.href = "http://localhost:5173/homePage";
        </script>
      `;
      res.send(redirectScript);
    } else {
      return res.json({ message: "No active status updated." });
    }
  });
});

app.post('/approve-entrepreneur', (req, res) => {
  const { email } = req.body;

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
    subject: 'Entrepreneur Status Approved',
    html: `
    <p>Your Entrepreneur account status has been <span style="font-weight: bold; color: green;">Approved</span></p>. 
    <br/><p>please contact our support team at <span style="font-weight: bold;">campuschime@gmail.com</span></p>.
    <br/><p>Thank you for your understanding and cooperation.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.post('/decline-entrepreneur', (req, res) => {
  const { email } = req.body;

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
    subject: 'Entrepreneur Status Declined',
    html: `
    <p>Your Entrepreneur account status has been <span style="font-weight: bold; color: red;">Declined</span></p>. 
    <br/><p>please contact our support team at <span style="font-weight: bold;">campuschime@gmail.com</span></p>.
    <br/><p>Thank you for your understanding and cooperation.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.post('/reactive-account-email', (req, res) => {
  const { email } = req.body;

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
    subject: 'Your Account Reactivation',
    html: `
    <p>Your account has been <span style="font-weight: bold; color: green;">Reactivated!</span></p>. 
    <br/><p>please contact our support team at <span style="font-weight: bold;">campuschime@gmail.com</span></p>.
    <br/><p>Thank you for your understanding and cooperation.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.post('/deactive-account-email', (req, res) => {
  const { email } = req.body;

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
    subject: 'Your Account Deactivation',
    html: `
    <p>Your account has been <span style="font-weight: bold; color: red;">Deactivated!</span></p>. 
    <br/><p>please contact our support team at <span style="font-weight: bold;">campuschime@gmail.com</span></p>.
    <br/><p>Thank you for your understanding and cooperation.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
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
