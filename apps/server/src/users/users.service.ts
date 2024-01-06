import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async me(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        // get user info
        id: true,
        email: true,
        collections: {
          select: {
            role: true,
            collection: {
              include: {
                links: true,
                // get collection participants
                users: {
                  select: {
                    role: true,
                    user: {
                      select: {
                        id: true,
                        email: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByIdWithCollectionIds(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, collections: { select: { collectionId: true } } },
    });
  }

  async create(data: CreateUserDto) {
    return this.prismaService.user.create({ data });
  }
}
