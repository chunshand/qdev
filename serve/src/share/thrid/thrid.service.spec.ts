import { Test, TestingModule } from '@nestjs/testing';
import { ThridService } from './thrid.service';

describe('ThridService', () => {
  let service: ThridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThridService],
    }).compile();

    service = module.get<ThridService>(ThridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
