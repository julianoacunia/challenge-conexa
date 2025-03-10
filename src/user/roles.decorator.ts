import { SetMetadata } from '@nestjs/common';
import { UserRole } from './dto/create-user.dto'; // Ajusta la ruta según tu estructura

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);