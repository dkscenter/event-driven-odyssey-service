import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/common/config.module';
import { PluginConfig } from './database.interface';
import * as MongooseDelete from 'mongoose-delete';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { Connection } from 'mongoose';

const defaultPluginConfig: Array<PluginConfig> = [
  {
    plugin: MongooseDelete,
    options: {
      overrideMethods: true,
    },
  },
  {
    plugin: MongoosePaginate,
  },
];
const registerPlugin = (
  pluginList: Array<PluginConfig> = defaultPluginConfig,
) => {
  return (connection: Connection) => {
    for (const plugin of pluginList) {
      if (plugin.options) {
        connection.plugin(plugin.plugin, plugin.options);
      } else {
        connection.plugin(plugin.plugin);
      }
    }
    return connection;
  };
};

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        connectionFactory: registerPlugin(),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
