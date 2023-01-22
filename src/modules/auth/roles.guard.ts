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
        if(requiredRole.includes(request.user.userType)) //promeni u request.body..... pa kako ga vec prosledjujes (il ga nadji po userId-u pa nadji usera i njegov tip)
            return true;
        return false;
    }
}