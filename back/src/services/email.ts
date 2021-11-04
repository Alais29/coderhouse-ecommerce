import Config from 'config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class Email {
  private owner: { name: string; address: string };
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.owner = {
      name: Config.GMAIL_NAME,
      address: Config.GMAIL_EMAIL,
    };

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: Config.GMAIL_EMAIL,
        pass: Config.GMAIL_PASSWORD,
      },
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
      attachments: [] as { path: string }[],
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          path: attachment,
        },
      ];
    }

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();
