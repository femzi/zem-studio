# Payment Setup Guide - Zem Studio

## Quick Start: Adding Your Paystack API Key

### Step 1: Get Your Paystack Public Key
1. Visit [paystack.com](https://paystack.com)
2. Sign up or log in to your dashboard
3. Go to **Settings** → **API Keys & Webhooks**
4. Copy your **PUBLIC KEY** (format: `pk_live_xxx...`)

### Step 2: Add to Your Project
1. Open `.env.local` in the root of your project
2. Replace `YOUR_PAYSTACK_PUBLIC_KEY` with your actual key:
   ```
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_1234567890abcdefghijk
   ```
3. Save the file

### Step 3: Restart Dev Server
```bash
npm run dev
```

---

## How the Payment Flow Works

### 1. **Checkout Page** (`src/app/checkout/page.tsx`)
- User fills in their details and cart review
- Click "Place Order" → validation runs

### 2. **Form Validation**
- Checks all fields are filled
- Validates email format
- Validates Nigerian phone number
- Shows error messages for any issues

### 3. **Payment Processing** (`src/app/lib/utils.ts`)
When validation passes:
- Amount is converted to kobo (₦ × 100)
- Paystack popup appears
- User enters card details
- Payment is processed securely by Paystack

### 4. **Success/Error Handling**
- **Success**: Order saved to database, cart cleared, redirect home
- **Error**: User sees error message, can retry
- **Cancel**: User sees message they cancelled (no charge)

---

## What to Change for Different Users

### If you're setting this up for someone else:

**Only ONE thing needs to change:**
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY = Their Paystack Public Key
```

Everything else stays the same! The code automatically:
- Sends payment to their Paystack account
- Saves orders to your database
- Uses their business info from the Paystack dashboard

---

## Testing

### Test Card Details
Paystack provides test cards for development:
- **Card Number**: 4123450131001381
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)
- **OTP**: 123456

---

## Troubleshooting

### "Payment service not configured"
- Check `.env.local` file exists
- Verify key starts with `pk_`
- Restart dev server after adding key

### "Invalid email/phone"
- Email must have @ and domain
- Phone must be Nigerian format: `08012345678` or `+2348012345678`

### Payment popup doesn't appear
- Check browser console (F12) for errors
- Ensure Paystack script loaded
- Try different browser

### Order created but payment failed
- User is notified with transaction reference
- They can contact support with the reference
- Order can be manually verified in Paystack dashboard

---

## Production Checklist

Before going live:
- [ ] Use production Paystack keys (not test keys)
- [ ] Add `.env.local` to `.gitignore`
- [ ] Test with real payment (if allowed)
- [ ] Set up email confirmations (optional)
- [ ] Add order tracking page for customers
- [ ] Monitor Paystack dashboard for transactions

---

## Additional Resources

- [Paystack Documentation](https://paystack.com/docs)
- [Paystack Payment Integration Guide](https://paystack.com/docs/payments)
- [Testing with Paystack](https://paystack.com/docs/payments/test/)

---

**Questions?** Check your Paystack dashboard or contact Paystack support.
