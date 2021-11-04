import Config from '../config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class Email {
  private owner: { name: string; address: string };
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(emailService: 'gmail' | 'ethereal') {
    const emailServiceOptions = {
      gmail: {
        name: Config.GMAIL_NAME,
        address: Config.GMAIL_EMAIL,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: Config.GMAIL_EMAIL,
          pass: Config.GMAIL_PASSWORD,
        },
      },
      ethereal: {
        name: Config.ETHEREAL_NAME,
        address: Config.ETHEREAL_EMAIL,
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: Config.ETHEREAL_EMAIL,
          pass: Config.ETHEREAL_PASSWORD,
        },
      },
    };

    this.owner = {
      name: emailServiceOptions[emailService].name,
      address: emailServiceOptions[emailService].address,
    };

    this.transporter = nodemailer.createTransport({
      host: emailServiceOptions[emailService].host,
      port: emailServiceOptions[emailService].port,
      auth: emailServiceOptions[emailService].auth,
    });
  }

  async sendEmail(
    dest: string,
    subject: string,
    content: string,
    attachment?: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
      attachments: [
        {
          filename: 'profile-picture.jpg',
          path: attachment,
        },
      ],
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}
