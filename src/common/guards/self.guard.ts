import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Roles } from '../enums';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = request.params.id;

    if (user?.role === Roles.SUPERADMIN) {
      return true;
    }

    if (user?.role === Roles.ADMIN && user?.id === paramId) {
      return true;
    }

    throw new ForbiddenException("You don't have access to this resource");
  }
}
