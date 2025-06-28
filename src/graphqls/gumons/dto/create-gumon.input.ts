import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateGumonInput } from 'src/schema/graphql.schema';

export class CreateGumonInputDto extends CreateGumonInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsBoolean()
  isActive?: boolean = true;
}
