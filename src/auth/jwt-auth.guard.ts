import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/dto/create-user.dto'; // Ajusta la ruta según tu estructura
import { ROLES_KEY } from '../user/roles.decorator'; // Ajusta la ruta según tu estructura

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Llama a la lógica de AuthGuard para verificar el token y adjuntar el usuario
    const canActivate = await super.canActivate(context); // Usa await aquí
    if (!canActivate) {
      return false; // Si el token no es válido, denegar el acceso
    }

    // Obtiene los roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // Si no se especifican roles, permitir el acceso
    }

    // Obtiene el usuario adjuntado por Passport
    const request = context.switchToHttp().getRequest();

    if (!request.user?.role) {
      throw new UnauthorizedException('Usuario no tiene un rol asignado');
    }

    // Verifica si el rol del usuario está permitido
    console.log("USER", request.user)
    const hasRole = requiredRoles.includes(request.user.role);
    if (!hasRole) {
      throw new UnauthorizedException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }
    return user; // Adjunta el usuario a la solicitud
  }
}