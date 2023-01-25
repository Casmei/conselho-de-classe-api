import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCouncilDto {
  @ApiProperty({
    description: 'nome do conselho de classe',
    example: 'Conselho de Classe do Integrado',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'descrição do conselho de classe',
    example:
      'Um estudo sobre o desenvolvimento dos alunos na primeira metade do ano',
  })
  @IsString()
  description: string;
}
