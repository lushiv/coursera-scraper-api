import { Test, TestingModule } from '@nestjs/testing';
import { AppControllerV1 } from './app.controller';
import { AppService } from './app.service';

describe('AppControllerV1', () => {
  let appControllerVAppControllerV1: AppControllerV1;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppControllerV1],
      providers: [AppService],
    }).compile();

    appControllerVAppControllerV1 = app.get<AppControllerV1>(AppControllerV1);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appControllerVAppControllerV1.getAllCourses()).toBe('Hello World!');
    });
  });
});
