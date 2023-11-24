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
    subject: 'API Testing',
    text: 'This is the Forget Password API of CampusChime'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});

