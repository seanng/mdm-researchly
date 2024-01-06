import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CollectionsModule as InitialCollectionsModule } from 'src/collections/collections.module';
import { LinksModule as InitialLinksModule } from 'src/links/links.module';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';

const CollectionsModule = forwardRef(() => InitialCollectionsModule);
const LinksModule = forwardRef(() => InitialLinksModule);

@Module({
  imports: [AuthModule, CollectionsModule, LinksModule],
  providers: [SocketsGateway, SocketsService],
  exports: [SocketsGateway, SocketsService],
})
export class SocketsModule {}
