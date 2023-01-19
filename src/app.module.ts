import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './modules/redis/redis.module';
import { REDIS } from './modules/redis/redis.constants';
import { environment } from './environments/environment';

import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from 'redis';
// import { REDIS, RedisModule } from './redis';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, BirthDate, Schedule, Note, Description, Quote, Page, HelpCall]),
    UserModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //const pubClient: = createClient({ url: `redis://<path to redis>:6379` });
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: environment.session_secret,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 3600000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
