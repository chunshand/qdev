import { Test, TestingModule } from '@nestjs/testing';
import { LoginLogService } from './login-log.service';

describe('LoginLogService', () => {
  let service: LoginLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginLogService],
    }).compile();

    service = module.get<LoginLogService>(LoginLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
