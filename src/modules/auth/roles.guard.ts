import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { request } from "http";
import { UserType } from "src/enums/user-type.enum";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    async canActivate(context: ExecutionContext){
        let requiredRole = this.reflector.getAllAndOverride<UserType[]>("roles", [
            context.getHandler(),
            context.getClass()
        ]);
        const request = context.switchToHttp().getRequest();
        if(requiredRole.includes(request.user.userType))
            return true;
        return false;
    }
}