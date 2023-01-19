import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async getUserByEmail(email: string){
        return await this.userRepo.createQueryBuilder("user")
        .where("user.email = :userEmail", {userEmail: email})
        .getOne();
    }

    // async changeOnlineStatus(id: number){
    //     let user = await this.getUserById(id);
    //     user.online = !user.online;
    //     await this.userRepo.save(user);
    // }

    async updateUser_Online(id: number){
        let user = await this.getUserById(id);
        user.online = true;
        await this.userRepo.save(user);
    }

    async updateUser_Offline(id: number){
        let user = await this.getUserById(id);
        user.online = false;
        await this.userRepo.save(user);
    }

    getUserById(id: number): Promise<User>{
        //return this.userRepo.findOneById(id);
        return this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.patients", "patients")
            .where("user.id = :userId", {userId: id})
            .getOne();
    }

    // logInUser(loginInfo: loginDto): Promise<boolean>{
    //     return this.userRepo.createQueryBuilder("user")
    //     .where("user.email = :userEmail", {userEmail: loginInfo.email})
    //     .getOne()
    //     .then((user)=> {
    //         if(user){
    //             if(user.password === loginInfo.password){
    //                 return true;
    //             }
    //         }
    //         return false;
    //     });
        
    // }

    

}
