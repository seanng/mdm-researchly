import { forwardRef, Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { PrismaService } from '../prisma.service';
import { SocketsModule as InitialSocketsModule } from '../sockets/sockets.module';

const SocketsModule = forwardRef(() => InitialSocketsModule);

@Module({
  imports: [SocketsModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, PrismaService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
