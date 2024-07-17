import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';

export function extractTokenHeader(request: IRequestWithUser): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, token] = request.headers.authorization?.split(' ') ?? [];
  return token;
}
