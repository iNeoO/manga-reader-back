import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserWIthoutPassword } from './type/user.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUsers(): Promise<UserWIthoutPassword[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        lastLoginOn: true,
      },
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserWIthoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        lastLoginOn: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
