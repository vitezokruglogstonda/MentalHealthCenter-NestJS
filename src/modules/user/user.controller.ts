import { Body, Controller, Get, Param, Put, UseGuards, Request, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
//import { Param } from "@nestjs/common/decorators";
import { User } from "src/entities/user.entity";
import { UserType } from "src/enums/user-type.enum";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { RoleGuard } from "../auth/roles.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { UserService } from "./user.service";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("getUser/:id")
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @UseGuards(LocalAuthGuard)
    @Put("logIn")
    logIn(@Request() req): any {
        //this.userService.changeOnlineStatus(req.user.id);
        return req.session.cookie;
    }

    @UseGuards(AuthenticatedGuard)
    @Put("logOut")
    async logOut(@Request() req): Promise<any> {
        await this.userService.updateUser_Offline(req.user.id);
        req.logOut(()=>{
            req.session.cookie.maxAge = 0;            
        });
        return req.session;
    }

    // @UseGuards(AuthenticatedGuard)
    // @UseGuards(RoleGuard)
    // @Roles(UserType.Therapist, UserType.Patient)
    // @Get("random")
    // random(): string{
    //     return "eo me";
    // }
}