import { NotEquals } from 'class-validator';
import { UpdateGumonInput } from 'src/schema/graphql.schema';

export class UpdateGumonInputDto extends UpdateGumonInput {
  @NotEquals(null)
  name?: string;

  @NotEquals(null)
  description?: string;

  @NotEquals(null)
  isActive?: boolean;
}
