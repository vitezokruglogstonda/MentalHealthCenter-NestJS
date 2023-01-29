import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpCall } from 'src/entities/help-call.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HelpCall])],
  providers: [OperatorService],
  controllers: [OperatorController],
  exports: [OperatorService]
})
export class OperatorModule {}
