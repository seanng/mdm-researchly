import {
  SubscribeMessage,
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { SocketsService } from './sockets.service';
import { CollectionsService } from 'src/collections/collections.service';
import { CreateCollectionDto } from 'src/collections/dto/create-collection.dto';
import { LinksService } from 'src/links/links.service';
import { UpdateLinkDto } from 'src/links/dto/update-link.dto';

/**
 * Events are emitted to rooms (labelled as the collectionId) rather than individual clients.
 * This allows events to be broadcasted to all users in a collection.
 */
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private authService: AuthService,
    private socketsService: SocketsService, // private collectionsService: CollectionsService,
    private collectionsService: CollectionsService,
    private linksService: LinksService,
  ) {}

  private logger: Logger = new Logger('SocketsGateway');

  // Lifecycle hook that runs after the gateway has been initialized.
  afterInit(server: Server) {
    this.socketsService.socket = server;
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Subscribe the connected client to all events broadcasted to the collections they are in.
   */
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const user = await this.authService.getUserFromAuthToken(
        client.handshake.auth.token,
      );
      const collectionIdList = user.collections.map((c) => c.collectionId);
      this.logger.log(`Client connected: ${client.id}`);
      client.data.userId = user.id;
      client.join(collectionIdList);
    } catch (error) {
      console.log('error: ', error);
      client.disconnect();
    }
  }

  /**
   * Handler for the "Collection Creation" message passed by the extension.
   * Subscribes the client to future events emitted by users in the newly created collection.
   */
  @SubscribeMessage('B_COLLECTION_CREATE')
  async onCollectionCreate(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateCollectionDto,
  ) {
    const { userId } = client.data;
    const collection = await this.collectionsService.create(userId, body);
    client.join(collection.id);
    client.emit('S_COLLECTION_CREATED', collection);
  }

  /**
   * Handler for the "Link Update" message emitted by the updater's extension.
   * Broadcasts this message to all connected users in the collection, with the updated info.
   */
  @SubscribeMessage('B_LINK_UPDATE')
  async onLinkUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { id: string; data: UpdateLinkDto },
  ) {
    const link = await this.linksService.update(body.id, body.data);
    this.socketsService.socket.to(link.collectionId).emit('S_LINK_UPDATE', {
      userId: client.data.userId,
      data: link,
    });
  }

  /**
   * Handler for the "Link Delete" message emitted by the updater's extension.
   * Broadcasts this message to all connected users in the collection, with the updated info.
   */
  @SubscribeMessage('B_LINK_DELETE')
  async onLinkDelete(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { id: string },
  ) {
    const link = await this.linksService.delete(body.id);
    this.socketsService.socket.to(link.collectionId).emit('S_LINK_DELETE', {
      userId: client.data.userId,
      data: link,
    });
  }
}
