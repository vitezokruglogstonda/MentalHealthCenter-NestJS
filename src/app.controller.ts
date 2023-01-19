import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("proba")
  proba(@Session() session: Record<string, any>){
    
    return session.cookie;
  }

  @Get("fillData")
  async enterTestData(): Promise<string>{
    await this.appService.fillDatabase();
    return "Data entered successfuly";
  }
}
