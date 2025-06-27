import { Test, TestingModule } from '@nestjs/testing';
import { GumonsService } from './gumons.service';

describe('GumonsService', () => {
  let service: GumonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GumonsService],
    }).compile();

    service = module.get<GumonsService>(GumonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
