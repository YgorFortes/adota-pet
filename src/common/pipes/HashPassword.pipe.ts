import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService?: ConfigService) {}

  async transform(password: string): Promise<string> {
    try {
      const saltRounds = await bcrypt.genSalt(12);

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return hashedPassword;
    } catch (error) {
      throw new BadRequestException('Não foi possível criar uma hash do password');
    }
  }
}
