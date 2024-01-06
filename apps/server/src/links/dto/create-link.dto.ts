import { IsUrl, Length } from 'class-validator';

export class CreateLinkDto {
  title: string;

  // @IsUrl()
  url: string;

  // @IsUrl()
  faviconUrl?: string;

  description?: string;

  @Length(24, 24)
  collectionId: string;
}
