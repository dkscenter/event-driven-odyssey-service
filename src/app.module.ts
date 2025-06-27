import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { GumonsModule } from './graphqls/gumons/gumons.module';
import { SyncGumonModule } from './kafka-consumer/sync-gumon/sync-gumon.module';
@Module({
  imports: [
    // common
    CommonModule,
    DatabaseModule,

    // kafka consumer
    SyncGumonModule,
    // api
    GumonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
