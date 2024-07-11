import { IImageFile } from '../../../user/createUser/dtos/IImageFile';

export interface IManagePhotoInCloudInterface {
  uploadPhoto(image: IImageFile): Promise<string>;
  deletePhoto(url: string): Promise<boolean>;
}
