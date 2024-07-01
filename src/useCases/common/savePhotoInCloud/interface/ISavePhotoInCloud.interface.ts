import { IImageFile } from '../../../user/createUser/dtos/IImageFile';

export interface ISavePhotoInCoudInterface {
  execute(image: IImageFile): Promise<string>;
}
