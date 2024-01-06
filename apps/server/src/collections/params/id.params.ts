import { Length } from 'class-validator';

export class IDParams {
  @Length(24, 24)
  id: string;
}
