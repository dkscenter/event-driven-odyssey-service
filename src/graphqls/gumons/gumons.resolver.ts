import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GumonsService } from './gumons.service';
import { CreateGumonInput } from './dto/create-gumon.input';
import { UpdateGumonInput } from './dto/update-gumon.input';

@Resolver('Gumon')
export class GumonsResolver {
  constructor(private readonly gumonsService: GumonsService) {}

  @Mutation('createGumon')
  create(@Args('createGumonInput') createGumonInput: CreateGumonInput) {
    return this.gumonsService.create(createGumonInput);
  }

  @Query('gumons')
  findAll() {
    return this.gumonsService.findAll();
  }

  @Query('gumon')
  findOne(@Args('id') id: number) {
    return this.gumonsService.findOne(id);
  }

  @Mutation('updateGumon')
  update(@Args('updateGumonInput') updateGumonInput: UpdateGumonInput) {
    return this.gumonsService.update(updateGumonInput.id, updateGumonInput);
  }

  @Mutation('removeGumon')
  remove(@Args('id') id: number) {
    return this.gumonsService.remove(id);
  }
}
