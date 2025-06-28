import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { GumonsService } from './gumons.service';
import { CreateGumonInputDto } from './dto/create-gumon.input';
import { PubSub } from 'graphql-subscriptions';
import { UpdateGumonInputDto } from './dto/update-gumon.input';
const pubSub = new PubSub();

@Resolver('Gumon')
export class GumonsResolver {
  constructor(private readonly gumonsService: GumonsService) {}

  @Mutation('createGumon')
  async create(
    @Args('createGumonInput') createGumonInput: CreateGumonInputDto,
  ) {
    const newGumon = await this.gumonsService.create(createGumonInput);
    await pubSub.publish('gumonCreated', {
      gumonCreated: newGumon,
    });

    return newGumon;
  }

  @Query('getGumons')
  findAll() {
    return this.gumonsService.findAll();
  }

  @Query('getGumonById')
  findOne(@Args('id') id: string) {
    return this.gumonsService.findOne(id);
  }

  @Mutation('updateGumon')
  update(
    @Args('id') id: string,
    @Args('updateGumonInput') updateGumonInput: UpdateGumonInputDto,
  ) {
    return this.gumonsService.update(id, updateGumonInput);
  }

  @Mutation('removeGumon')
  remove(@Args('id') id: string) {
    return this.gumonsService.remove(id);
  }

  @Subscription('gumonCreated', {
    resolve: (value) => value,
  })
  gumonCreated() {
    console.log('gumonCreated subscription triggered');
    // This subscription will listen for 'gumonCreated' events
    return pubSub.subscribe('gumonCreated', async (payload) => {
      return payload.gumonCreated;
    });
  }
  // commentAdded() {
  //   return pubSub.asyncIterableIterator('gumonCreated');
  // }
}
