import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstanceDto {
  @ApiProperty({
    description: 'Nome da instituição',
    example: 'Instituto Federal do Norte de Minas Gerais',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
