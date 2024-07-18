import { IEmailDto, IManageEmailInterface } from './interface/IManageEmail.interface';

import { BadGatewayException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateHtmlTemplate } from './generateTemplateEmail';

export class ManageEmailProvide implements IManageEmailInterface {
  async sendEmail(emailDto: IEmailDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    try {
      transporter.sendMail({
        from: `${emailDto.guardianEmail}`,
        to: emailDto.email,
        subject: `Sobre o pet ${emailDto.pet.name}.`,
        html: generateHtmlTemplate(emailDto.message.content, emailDto.pet.photo),
      });
    } catch (error) {
      throw new BadGatewayException('Serviço de upload indisponível.');
    }
  }
}
