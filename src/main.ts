import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { environment } from './environments/environment';
import * as connectRedis from 'connect-redis'
import { REDIS } from './modules/redis/redis.constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  app.enableCors({
    origin: "http//localhost:4200"
  })
  // app.use(
  //   session({
  //     store: new RedisStore({ client: REDIS, logErrors: true }),
  //     secret: environment.session_secret,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 3600000,
  //     }
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
