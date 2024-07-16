import { TokenInvalid } from 'src/entities/TokenInvalid.entity';

export interface ITokenInvalidRepository {
  findAll(): Promise<Array<TokenInvalid>>;
  saveTokenInvalid(token: TokenInvalid): Promise<void>;
  deleteAllTokensInvalids(): Promise<boolean>;
}
