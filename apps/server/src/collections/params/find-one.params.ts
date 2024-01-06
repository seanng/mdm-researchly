import { Length } from 'class-validator';

export class FindOneParams {
  @Length(24, 24)
  id: string;
}
