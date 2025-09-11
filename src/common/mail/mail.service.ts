import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: String(process.env.MEIL_FROM),
        pass: String(process.env.MEIL_PASS),
      },
    });
  }

  async sendMail(to: string, text: string): Promise<any> {
    try {
      const message = await this.transporter.sendMail({
        from: String(process.env.MEIL_FROM),
        to,
        html: text || '',
      });
      return message;
    } catch (error) {
      console.log(error);

      throw new UnprocessableEntityException(
        'Emailga xabar yuborishda xatolik bor',
        error,
      );
    }
  }
}
