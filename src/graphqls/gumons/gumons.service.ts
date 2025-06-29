import { Injectable } from '@nestjs/common';
import { CreateGumonInputDto } from './dto/create-gumon.input';
import { UpdateGumonInputDto } from './dto/update-gumon.input';
import { GumonDocument } from 'src/database/schemas/gumon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CombinedPluginModel } from 'src/database/database.interface';
import { customPaginate } from 'src/database/customPaginate';
import { CustomPaginate } from 'src/schema/graphql.schema';

@Injectable()
export class GumonsService {
  constructor(
    //dataBase
    @InjectModel(GumonDocument.name)
    private readonly gumonDocModel: CombinedPluginModel<GumonDocument>,
  ) {}

  async create(createGumonInput: CreateGumonInputDto) {
    const newGumon = await this.gumonDocModel.create({ ...createGumonInput });
    return newGumon;
  }

  async findAll() {
    const gumonList = await customPaginate<GumonDocument>({
      model: this.gumonDocModel,
      query: {},
      options: {
        limit: 10,
        page: 1,
        sort: { createdAt: -1 },
      },
    });
    console.log('gumonList', gumonList);
    return {
      data: gumonList.data,
      pagination: gumonList.pagination as CustomPaginate,
    };
  }

  async findOne(id: string) {
    const gumon = await this.gumonDocModel.findById(id);
    return gumon;
  }

  async update(id: string, updateGumonInput: UpdateGumonInputDto) {
    const data = await this.gumonDocModel.findByIdAndUpdate(
      id,
      { ...updateGumonInput },
      { new: true },
    );
    return data;
  }

  async remove(id: string) {
    const gumon = await this.gumonDocModel.findByIdAndDelete(id);
    return gumon;
  }
}
