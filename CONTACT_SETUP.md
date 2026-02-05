# Happy Winds Contact Form Setup

## Contact Section Features
✅ **Elegant Two-Column Layout**
- Left: Contact information with icons (Email, Phone, Location)
- Right: Streamlined contact form
- Removed resizable textarea - now uses single-line input for cleaner look
- Added loading states and success/error messages

## Backend Setup Instructions

### 1. Install Backend Dependencies
```bash
cd "c:/Users/karti/Desktop/Projects/Happy Winds"
npm install express nodemailer cors dotenv
npm install -D nodemon
```

### 2. Configure Email Settings

Create a `.env` file in the project root:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
RECIPIENT_EMAIL=your-email@gmail.com
SMS_EMAIL=your-number@carrier-gateway.com
PORT=3001
```

#### Getting Gmail App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not already)
3. App Passwords → Generate new password
4. Copy the 16-character password to `.env`

#### SMS via Email Gateway (No Third-Party Service):
Most Indian carriers support email-to-SMS:
- **Airtel**: `9876543210@airtelmail.com`
- **Jio**: `9876543210@jiomail.com`
- **Vodafone**: `9876543210@vodamail.in`
- **BSNL**: `9876543210@bsnlmail.com`

Replace `9876543210` with your actual number.

### 3. Update Vite Config for API Proxy

Add to `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

### 4. Run Both Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
node server.js
```

## How It Works

1. **User fills form** → Frontend sends POST to `/api/contact`
2. **Backend receives** → Validates data
3. **Sends 2 emails**:
   - To you: Full contact details
   - To customer: Confirmation message
4. **Optional SMS**: Sends notification to your phone via email-to-SMS
5. **Frontend shows** success/error message

## Contact Info to Update

Edit `src/components/Contact.jsx` lines 67-95 to add your real contact details:
- Email address
- Phone number
- Location

## Security Notes

- Never commit `.env` file to Git
- Use environment variables for all sensitive data
- Consider rate limiting for production
- Add CAPTCHA for spam prevention (optional)

## Alternative: FormSubmit (If Backend Fails)

If you prefer not to run a backend server, use FormSubmit:
1. Change form action to: `https://formsubmit.co/your-email@example.com`
2. Add hidden inputs for customization
3. No backend needed, but less control over emails
