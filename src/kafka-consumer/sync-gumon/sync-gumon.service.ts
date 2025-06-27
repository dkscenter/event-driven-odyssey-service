import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CombinedPluginModel } from 'src/database/database.interface';
import {
  IKafkaHeaders,
  KafkaConsumerService,
} from 'src/kafka/kafka.consumer.service';
import { KafkaProducerService } from 'src/kafka/kafka.producer.service';
import { GumonDocument } from 'src/database/schemas/gumon.schema';

interface IKafkaConsumer {
  refreshData: IRefreshData;
  action: string;
}

interface IRefreshData {
  refreshDataId: string;
  appKey: string;
  serviceKey: string;
  note: string;
}

@Injectable()
export class SyncGumonService implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly sectionConnection: Connection,

    //dataBase
    @InjectModel(GumonDocument.name)
    private readonly gumonDocModel: CombinedPluginModel<GumonDocument>,

    private kafkaProducerService: KafkaProducerService,
    private kafkaConsumerService: KafkaConsumerService,
  ) {}

  async onModuleInit() {
    this.kafkaConsumerService.kafkaInitProcess(
      'sync-gumon',
      this.processMessage.bind(this),
    );

    this.gumonDocModel.create({
      name: 'SyncGumonService',
    });
  }

  async processMessage(headers: IKafkaHeaders, message: string) {
    const consumeData: IKafkaConsumer = JSON.parse(message) as IKafkaConsumer;

    console.log(`SyncGumonService processMessage:`, consumeData);
  }
}
