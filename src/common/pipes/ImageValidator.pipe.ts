import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { IImageFile } from 'src/useCases/user/createUser/dtos/IImageFile';

@Injectable()
export class ImageValidator implements PipeTransform {
  constructor(private readonly required: boolean = false) {}
  transform(image: IImageFile): IImageFile {
    if (this.required && !image) {
      throw new BadRequestException('photo obrigatória.');
    }

    if (!image) {
      return undefined;
    }

    if (typeof image !== 'object') {
      throw new BadRequestException('photo deve ser um objeto válido.');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(image.mimetype)) {
      throw new BadRequestException(
        'Arquivo de imagem inválido. Certifique-se de enviar um arquivo no formato JPEG, PNG',
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSize) {
      throw new BadRequestException(
        'Arquivo de imagem inválido.  Certifique-se de enviar um arquivo que não ultrapasse 5MB.',
      );
    }

    return image;
  }
}
