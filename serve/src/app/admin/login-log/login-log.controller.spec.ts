import { Test, TestingModule } from '@nestjs/testing';
import { LoginLogController } from './login-log.controller';
import { LoginLogService } from './login-log.service';

describe('LoginLogController', () => {
  let controller: LoginLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginLogController],
      providers: [LoginLogService],
    }).compile();

    controller = module.get<LoginLogController>(LoginLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
