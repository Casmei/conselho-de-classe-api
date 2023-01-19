import { IsString } from 'class-validator';

export class CreateCouncilDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}
