import { IPayLoad } from './IPayLoad.interface';
import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: IPayLoad;
}
