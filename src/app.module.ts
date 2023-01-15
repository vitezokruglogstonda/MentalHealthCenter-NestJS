import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirthDate } from './entities/birth-date.entity';
import { Description } from './entities/description.entity';
import { HelpCall } from './entities/help-call.entity';
import { Note } from './entities/note.entity';
import { Page } from './entities/page.entity';
import { Quote } from './entities/quotes.entity';
import { Schedule } from './entities/schedule.entity';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, BirthDate, Schedule, Note, Description, Quote, Page, HelpCall]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
