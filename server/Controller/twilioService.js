require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID);
