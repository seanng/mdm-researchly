import { forwardRef, Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { PrismaService } from '../prisma.service';
import { SocketsModule as InitialSocketsModule } from '../sockets/sockets.module';

const SocketsModule = forwardRef(() => InitialSocketsModule);

@Module({
  imports: [SocketsModule],
  controllers: [LinksController],
  providers: [LinksService, PrismaService],
  exports: [LinksService],
})
export class LinksModule {}
