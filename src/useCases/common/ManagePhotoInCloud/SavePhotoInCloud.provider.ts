import { BadGatewayException } from '@nestjs/common';
import { IImageFile } from '../../user/createUser/dtos/IImageFile';
import { IManagePhotoInCloudInterface } from './interface/ISavePhotoInCloud.interface';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackblazeB2 = require('backblaze-b2');

export class ManagePhotoInCloudProvider implements IManagePhotoInCloudInterface {
  private backblazeB2: typeof BackblazeB2;
  constructor() {
    this.backblazeB2 = new BackblazeB2({
      applicationKeyId: process.env.BACKBLAZEB2APPLICATIONKEYID,
      applicationKey: process.env.BACKBLAZEB2APPLICATIONKEY,
    });
  }
  async uploadPhoto(image: IImageFile): Promise<string> {
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

  async deletePhoto(url: string): Promise<boolean> {
    try {
      const fileId = url.split('fileId=')[1];

      await this.backblazeB2.authorize();

      const reponseNamePhoto = await this.backblazeB2.getFileInfo({ fileId });
      const namePhoto = reponseNamePhoto.data.fileName;

      const responseDelete = await this.backblazeB2.deleteFileVersion({
        fileId: fileId,
        fileName: namePhoto,
      });

      if (responseDelete.status !== 200) {
        throw new BadGatewayException('Serviço de upload indisponível.');
      }

      return true;
    } catch (error) {
      throw new BadGatewayException('Serviço de upload indisponível.');
    }
  }
}
