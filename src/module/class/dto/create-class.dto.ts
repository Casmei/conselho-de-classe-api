import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ description: 'O nome da turma/classe', example: 'ADS2020' })
  @IsString()
  name: string;
}
