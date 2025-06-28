import { Module } from '@nestjs/common';
import { GumonsService } from './gumons.service';
import { GumonsResolver } from './gumons.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GumonDocument, GumonSchema } from 'src/database/schemas/gumon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GumonDocument.name,
        schema: GumonSchema,
      },
    ]),
  ],
  providers: [GumonsResolver, GumonsService],
})
export class GumonsModule {}
