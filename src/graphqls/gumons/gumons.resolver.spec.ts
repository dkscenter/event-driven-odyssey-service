import { Test, TestingModule } from '@nestjs/testing';
import { GumonsResolver } from './gumons.resolver';
import { GumonsService } from './gumons.service';

describe('GumonsResolver', () => {
  let resolver: GumonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GumonsResolver, GumonsService],
    }).compile();

    resolver = module.get<GumonsResolver>(GumonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
