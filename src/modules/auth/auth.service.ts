import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async validateUser(userEmail: string, userPassword: string): Promise<User | null>{
        let user: User = await this.userService.getUserByEmail(userEmail);
        if(user && user.password === userPassword){
            //hesiraj password pre poredjenja
            return user;
        }else{
            return null;
        }
    }
}
