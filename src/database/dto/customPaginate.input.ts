import { IsInt } from 'class-validator';
import { CustomPaginateInput } from 'src/schema/graphql.schema';

export class CustomPaginateInputDto extends CustomPaginateInput {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;
}
