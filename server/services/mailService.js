const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation on ${process.env.API_URL}`,
      text: '',
      html: `
          <div>
            <p>Click this <a href="${link}">link</a> to activate your account.</p>
          </div>
        `
    });
  }
}

module.exports = new MailService();
