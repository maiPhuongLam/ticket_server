import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { CinemasModule } from './cinemas/cinemas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    TicketsModule,
    MoviesModule,
    AuthModule,
    PaymentsModule,
    CinemasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
