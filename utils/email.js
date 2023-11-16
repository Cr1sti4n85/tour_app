const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const { convert } = require('html-to-text');

dotenv.config({ path: './config.env' });

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Cristian Perez <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //Envia la plantilla del correo
  async send(template, subject) {
    console.log(template);
    //1 Render template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    //2 Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    //3 Create transport and send email
    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendWelcome() {
    try {
      await this.send('welcome', 'Welcome to the Natours family');
    } catch (error) {
      console.log(error);
    }
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
