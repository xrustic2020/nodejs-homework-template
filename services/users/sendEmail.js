const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.EMAIL_API_KEY)

const sendEmail = async (email, verifyToken) => {
  const link = `http://localhost:3000/api/users/verify/${verifyToken}`

  const msg = {
    to: email,
    from: 'phonebook.app123@gmail.com',
    subject: 'Confirm your registration',
    text: `Welcome! To confirm your registration, please follow the link: ${link}`,
    html: `<h1>Welcome! Please, <a href=${link}>confirm</a> you registration</h1>`,
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error(error)
  }
}

module.exports = sendEmail
