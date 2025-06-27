import { Module } from '@nestjs/common';
import { GumonsService } from './gumons.service';
import { GumonsResolver } from './gumons.resolver';

@Module({
  providers: [GumonsResolver, GumonsService],
})
export class GumonsModule {}
