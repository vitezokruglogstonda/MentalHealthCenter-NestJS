import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelpCall } from 'src/entities/help-call.entity';
import { HelpCallDto } from 'src/models/help-call.model';
import { Repository } from 'typeorm';

@Injectable()
export class OperatorService {
    constructor(@InjectRepository(HelpCall) private helpCallRepo: Repository<HelpCall>){}

    async getCallList(): Promise<HelpCall[]>{
        //let return_list: HelpCallDto[] = [];

        return await this.helpCallRepo.createQueryBuilder("help_call")
            .where("help_call.processed = :status" , {status: false})
            .getMany();

        //return return_list;
    }

    async callDone(id: number): Promise<boolean>{
        let call: HelpCall = await this.helpCallRepo.createQueryBuilder("help_call")
            .where("help_call.id = :id", {id: id})
            .getOne();
        call.processed = true;
        await this.helpCallRepo.save(call);
        return true;
    }
}
