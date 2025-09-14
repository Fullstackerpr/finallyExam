import { JwtPayload } from './user.type';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
