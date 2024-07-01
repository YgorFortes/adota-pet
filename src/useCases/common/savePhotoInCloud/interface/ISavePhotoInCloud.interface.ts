import { IImageFile } from '../../../user/createUser/dtos/IImageFile';

export interface ISavePhotoInCloudInterface {
  execute(image: IImageFile): Promise<string>;
}
