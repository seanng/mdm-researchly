import {
  Controller,
  Post,
  Request,
  Delete,
  Param,
  UseGuards,
  Body,
  Patch,
  Get,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { IDParams } from './params/id.params';
import { SocketsService } from '../sockets/sockets.service';

@Controller('collections')
export class CollectionsController {
  constructor(
    private collectionsService: CollectionsService,
    private socketsService: SocketsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCollectionDto: CreateCollectionDto) {
    const { userId } = req.user;
    return this.collectionsService.create(userId, createCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async join(@Request() req, @Param() params: IDParams) {
    const { userId } = req.user;
    const collection = await this.collectionsService.join(userId, params.id);
    const userObj = collection.users.find((u) => u.user.id === userId);
    this.socketsService.socket.to(params.id).emit('S_NEW_JOINER', {
      user: { ...userObj.user, role: userObj.role },
      collectionId: params.id,
    });
    return collection;
  }

  /**
   * Update the database and broadcast the "update" event to users in the Collection.
   * This way, connected users can see the Collection updating in real time.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param() params: IDParams,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    const { userId } = req.user;
    const collection = await this.collectionsService.update(
      params.id,
      updateCollectionDto,
    );
    this.socketsService.socket.to(params.id).emit('S_COLLECTION_UPDATE', {
      userId,
      data: updateCollectionDto,
      collectionId: params.id,
    });
    return collection;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param() params: IDParams) {
    const { userId } = req.user;
    const collection = await this.collectionsService.findOne(params.id);
    return { collection, userId };
  }

  /**
   * Delete the Collection from the database and broadcast the "delete" event to connected users.
   * This way, connected users can see the Collection disappear in real time.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param() params: IDParams) {
    const { userId } = req.user;
    const result = await this.collectionsService.delete(params.id);
    this.socketsService.socket.to(params.id).emit('S_COLLECTION_DELETED', {
      userId,
      collectionId: params.id,
    });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':collectionId/users/:targetUserId')
  async deleteUser(
    @Request() req,
    @Param() params: { collectionId: string; targetUserId: string },
  ) {
    const { userId } = req.user;
    const { collectionId, targetUserId } = params;
    let newAdminId;

    // Leave own collection
    if (userId === targetUserId) {
      const collection = await this.collectionsService.findOne(collectionId);
      const hasAdmin = collection.users.find((p) => {
        return p.userId !== userId && p.role === 'ADMIN';
      });

      if (!hasAdmin) {
        const newAdmin = collection.users.find((p) => p.role === 'MEMBER');
        await this.collectionsService.updateUser(newAdmin.id, {
          role: 'ADMIN',
        });
        newAdminId = newAdmin.userId;
      }
    }

    const result = await this.collectionsService.deleteUser(
      targetUserId,
      collectionId,
    );
    this.socketsService.socket
      .to(collectionId)
      .emit('S_COLLECTION_USER_DELETED', {
        userId: targetUserId,
        collectionId,
        newAdminId,
      });
    return result;
  }
}
