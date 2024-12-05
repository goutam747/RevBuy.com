const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static HTML file
app.use(express.static('public')); // Assuming your HTML file is in 'public' folder

// POST route for form submission
app.post('/inquire', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password'    // Your email password (use environment variables in production)
        }
    });

    // Setup email data
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',   // Receiver's email address
        subject: 'New Inquiry from ' + name,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error occurred while sending email');
        }
        res.send('Inquiry submitted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
