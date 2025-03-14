import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/dto/create-user.dto';
import { ROLES_KEY } from '../user/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: UserRole } }>();

    if (!request.user?.role) {
      throw new UnauthorizedException('Usuario no tiene un rol asignado');
    }
    const hasRole = requiredRoles.includes(request.user.role);
    if (!hasRole) {
      throw new UnauthorizedException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    return true;
  }

  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }
    return user as TUser;
  }
}
