import { Module } from '@nestjs/common';
import { KafkaConsumerService } from 'src/kafka/kafka.consumer.service';
import { SyncGumonService } from './sync-gumon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GumonDocument, GumonSchema } from 'src/database/schemas/gumon.schema';
import { KafkaProducerService } from 'src/kafka/kafka.producer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GumonDocument.name,
        schema: GumonSchema,
      },
    ]),
  ],
  providers: [SyncGumonService, KafkaConsumerService, KafkaProducerService],
})
export class SyncGumonModule {}
