import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api/v1")
export class AppControllerV1 {
  constructor(private readonly appService: AppService) {}

  @Get('courses')
  async getAllCourses(){
    return await this.appService.getAllCourses();
  }
}

@Controller("api/v2")
export class AppControllerV2 {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllCourses(){
    return await this.appService.getAllCourses();
  }
}
