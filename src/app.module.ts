import { Module } from '@nestjs/common';
import { AppControllerV1, AppControllerV2 } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [],
  controllers: [AppControllerV1, AppControllerV2],
  providers: [AppService],
})
export class AppModule {}
