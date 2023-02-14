import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ExampleMiddleware } from './middleware/example/example.middleware';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(ExampleMiddleware).forRoutes('users')
    //consumer.apply(ExampleMiddleware).forRoutes(UsersController);
    consumer.apply(ExampleMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET
    }, 
    {
      path: 'users/:id',
      method: RequestMethod.GET
    });
  }
}
