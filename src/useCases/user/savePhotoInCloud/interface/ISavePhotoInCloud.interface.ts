import { IImageFile } from '../../createUser/dtos/IImageFile';

export interface ISavePhotoInCoudInterface {
  savePhoto(image: IImageFile): Promise<string>;
}
