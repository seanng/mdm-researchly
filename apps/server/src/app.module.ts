import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { LinksModule } from './links/links.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CollectionsModule,
    LinksModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
