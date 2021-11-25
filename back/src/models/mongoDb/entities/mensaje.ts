export class Mensaje {
  private email: string;
  private text: string;
  private date: string;

  constructor(email: string, text: string, date: string) {
    this.email = email;
    this.text = text;
    this.date = date;
  }
}
