import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        // Email to owner
        const mailToYou = {
            from: process.env.EMAIL_USER,
            to: 'hihappywinds@gmail.com',
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
                </div>
            `
        };

        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
