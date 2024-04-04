import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";
import { User, UserDocument, UserRole } from "src/users/schemas/user.schema";

const matchRoles = (roles: UserRole[], userRole: UserRole): boolean => {
  return roles.includes(userRole)
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(Roles, [context.getHandler(), context.getClass()]);

    if (!roles || !roles.length) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user: UserDocument = request.user;
    return roles.some(role => user.role === role)
  }
  
}