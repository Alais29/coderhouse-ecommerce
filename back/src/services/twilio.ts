import Config from 'config';
import twilio from 'twilio';

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);
  }

  async sendMessage(
    cellphoneNumber: string,
    message: string,
    mode: 'sms' | 'whatsapp',
  ) {
    const params = {
      body: message,
      from:
        mode === 'sms'
          ? Config.TWILIO_CELLPHONE
          : `whatsapp:${Config.TWILIO_CELLPHONE_WHATSAPP}`,
      to: `${mode === 'sms' ? '' : 'whatsapp:'}${cellphoneNumber}`,
    };

    const response = await this.twilio.messages.create(params);
    return response;
  }
}

export const SmsService = new Twilio();
