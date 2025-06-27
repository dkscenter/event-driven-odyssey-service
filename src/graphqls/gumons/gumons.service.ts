import { Injectable } from '@nestjs/common';
import { CreateGumonInput } from './dto/create-gumon.input';
import { UpdateGumonInput } from './dto/update-gumon.input';

@Injectable()
export class GumonsService {
  create(createGumonInput: CreateGumonInput) {
    return 'This action adds a new gumon';
  }

  findAll() {
    return `This action returns all gumons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gumon`;
  }

  update(id: number, updateGumonInput: UpdateGumonInput) {
    return `This action updates a #${id} gumon`;
  }

  remove(id: number) {
    return `This action removes a #${id} gumon`;
  }
}
