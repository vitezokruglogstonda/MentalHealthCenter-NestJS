import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Page } from './entities/page.entity';
import { QuoteDto } from './models/quote.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("fillData")
  async enterTestData(): Promise<string>{
    await this.appService.fillDatabase();
    return "Data entered successfuly";
  }

  @Get("get-sidenav-items")
  async getAllPages(): Promise<Page[]>{
    return await this.appService.getPages();
  }

  @Get("user-quotes")
  async getQuotes(): Promise<QuoteDto[]>{
    return await this.appService.getQuotes();
  }
}
