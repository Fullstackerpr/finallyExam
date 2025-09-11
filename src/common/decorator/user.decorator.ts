import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../utils/types/admin.type';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: JwtPayload = req.user;

    if (data) {
      return user?.[data];
    }
    return user;
  },
);
