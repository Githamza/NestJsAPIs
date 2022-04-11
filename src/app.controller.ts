import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Category, Product, User } from '@prisma/client';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.appService.user({ id: Number(id) });
  }
  @Get('products/')
  async getAllProducts(@Query('token') token: string): Promise<Product[]> {
    return this.appService.allProducts(token);
  }
  @Get('productsfromList/')
  async getProductsFromList(
    @Query('products') productsIds: string,
    @Query('token') token: string,
  ): Promise<Product[]> {
    return this.appService.listedProducts(token, productsIds);
  }
  @Get('categories')
  async getAllCategories(): Promise<Category[]> {
    return this.appService.allCategories();
  }
  @Post('login')
  async logUser(
    @Body('userId') userId: string,
    @Body('password') password: string,
  ): Promise<Partial<User>> {
    return this.appService.login(Number(userId), password);
  }
}
