import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Nome do curso',
    examples: [
      'Analise e desenvolvimento de sistema',
      'Enfermagem',
      'Administração',
    ],
  })
  @IsString()
  name: string;
}
