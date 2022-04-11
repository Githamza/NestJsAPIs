import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Category, Prisma, Product, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async user(userId: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userId,
    });
  }
  async allProducts(token: string): Promise<Product[] | null> {
    const isUserAuth = await this.checkIfHashExists(token);
    const isPublic = isUserAuth === 0 ? 1 : 0;
    return this.prisma.product.findMany({
      where: {
        visible_authenticated: isUserAuth,
        visible_public: isPublic,
      },
    });
  }
  async listedProducts(
    token: string,
    productsIds: string,
  ): Promise<Product[] | null> {
    const productsIdsArr = productsIds.split(',').map((id) => Number(id));
    const isUserAuth = await this.checkIfHashExists(token);
    const isPublic = isUserAuth === 0 ? 1 : 0;
    return this.prisma.product.findMany({
      where: {
        id: { in: productsIdsArr },
        visible_authenticated: isUserAuth,
        visible_public: isPublic,
      },
    });
  }
  async allCategories(): Promise<Category[] | null> {
    return this.prisma.category.findMany();
  }
  async login(id: number, password: string): Promise<Partial<User>> {
    const hashedPassword = createHash('md5')
      .update(`${id}${password}`)
      .digest('hex');
    return this.prisma.user.findFirst({
      where: {
        password_hash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async checkIfHashExists(token: string): Promise<number> {
    return (await this.prisma.user.findFirst({
      where: {
        password_hash: token || '',
      },
    }))
      ? 1
      : 0;
  }
}
