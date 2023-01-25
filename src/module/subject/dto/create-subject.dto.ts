import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'O nome da disciplina',
    example: 'Estrutura de Dados',
  })
  @IsString()
  name: string;
}
