import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, body: CreateLinkDto) {
    try {
      const link = await this.prismaService.link.create({
        data: {
          collection: {
            connect: { id: body.collectionId },
          },
          url: body.url,
          title: body.title,
          description: body.description,
          faviconUrl: body.faviconUrl,
          readerInfo: {
            [userId]: { hasReadIt: false },
          },
        },
        select: {
          id: true,
          url: true,
          description: true,
          title: true,
          faviconUrl: true,
          readerInfo: true,
        },
      });
      return link;
    } catch (error) {
      console.log('error in create link: ', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all links`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      const link = await this.prismaService.link.update({
        where: { id },
        data: updateLinkDto,
      });
      return link;
    } catch (error) {
      console.log('error in update collection: ', error);
      throw error;
    }
  }

  delete(id: string) {
    try {
      return this.prismaService.link.delete({
        where: { id },
        select: {
          id: true,
          collectionId: true,
        },
      });
    } catch (error) {
      console.log('error in delete link: ', error);
      throw error;
    }
  }
}
