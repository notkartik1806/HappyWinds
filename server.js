import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Email to you
        const mailToYou = {
            from: process.env.EMAIL_USER,
            to: 'hihappywinds@gmail.com', // Updated to your new business email
            subject: `🚀 New Project Inquiry from ${name}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
                    <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                        ${message}
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 0.8rem; color: #888;">Sent from Happy Winds Portfolio Contact Form</p>
                </div>
            `
        };

        // Confirmation email to customer
        const mailToCustomer = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for reaching out to Happy Winds Logo',
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
                    <h2>Thank you for your interest!</h2>
                    <p>Dear ${name},</p>
                    <p>We've received your project inquiry and our team will get back to you within 24 hours.</p>
                    <p><strong>Your Inquiry Details:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                        ${message}
                    </div>
                    <p>Speak soon,<br><strong>Team Happy Winds Logo</strong></p>
                </div>
            `
        };

        // Send emails
        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        // BACKGROUND WHATSAPP (Automated, no customer interaction)
        // To make this work WITHOUT the customer opening WhatsApp, you can use a service like CallMeBot (free) or Twilio.
        // Example for CallMeBot (replace [API_KEY] with your key from callmebot.com):
        /*
        const waText = encodeURIComponent(`*New Lead from Website*\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`);
        await fetch(`https://api.callmebot.com/whatsapp.php?phone=919664829116&text=${waText}&apikey=[YOUR_KEY]`);
        */

        // Optional: SMS notification using email-to-SMS gateway
        // Most carriers support email-to-SMS: phonenumber@carrier-gateway.com
        // Example for India: phonenumber@sms.carrier.com
        if (process.env.SMS_EMAIL) {
            const smsNotification = {
                from: process.env.EMAIL_USER,
                to: process.env.SMS_EMAIL,
                subject: '',
                text: `New contact: ${name} (${phone}) - ${message.substring(0, 100)}`
            };
            await transporter.sendMail(smsNotification);
        }

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
