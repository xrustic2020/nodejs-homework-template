const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.EMAIL_API_KEY)

const msg = {
  to: 'delifi5737@ovooovo.com', // Change to your recipient
  from: 'phonebook.app123@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'Hello, Daria! and easy to do anywhere, even with Node.js',
  html: '<h1>Hello, Daria! and easy to do anywhere, even with Node.js</h1>',
}

const sending = async () => {
  try {
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error(error)
  }
}

sending()
