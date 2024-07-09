import { BadGatewayException } from '@nestjs/common';
import { IImageFile } from '../../user/createUser/dtos/IImageFile';
import { ISavePhotoInCloudInterface } from './interface/ISavePhotoInCloud.interface';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackblazeB2 = require('backblaze-b2');

export class SavePhotoInCloudProvider implements ISavePhotoInCloudInterface {
  private backblazeB2: typeof BackblazeB2;
  constructor() {
    this.backblazeB2 = new BackblazeB2({
      applicationKeyId: process.env.BACKBLAZEB2APPLICATIONKEYID,
      applicationKey: process.env.BACKBLAZEB2APPLICATIONKEY,
    });
  }
  async execute(image: IImageFile): Promise<string> {
    try {
      await this.backblazeB2.authorize();

      const response = await this.backblazeB2.getUploadUrl({
        bucketId: process.env.BUCKETID,
      });

      const uploadReponse = await this.backblazeB2.uploadFile({
        uploadUrl: response.data.uploadUrl,
        uploadAuthToken: response.data.authorizationToken,
        fileName: image.originalname,
        data: image.buffer,
      });

      const fileId = uploadReponse.data.fileId;
      if (uploadReponse.status !== 200) {
        throw new BadGatewayException('Serviço de upload indisponível.');
      }
      const url = `${process.env.URLBACKBLAZE}?fileId=${fileId}`;
      return url;
    } catch (error) {
      throw new BadGatewayException('Serviço de upload indisponível.');
    }
  }
}
