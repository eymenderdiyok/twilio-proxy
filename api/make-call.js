// api/make-call.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin verilir.' });
  }

  const { to } = req.body;

  try {
    const call = await client.calls.create({
      twiml: '<Response><Say>Bu bir test çağrısıdır. Merhaba!</Say></Response>',
      to: to,
      from: fromNumber
    });

    res.status(200).json({ success: true, sid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
