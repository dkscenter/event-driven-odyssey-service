import { CreateGumonInput } from './create-gumon.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGumonInput extends PartialType(CreateGumonInput) {
  id: number;
}
