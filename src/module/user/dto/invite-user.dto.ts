import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class InviteUserDto {
  @ApiProperty({
    description: 'Email do usuário a ser convidado',
    example: 'casmei@protonmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Uma lista de disciplinas que o professor ensina',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsArray()
  subjects?: { id: string }[];

  @ApiProperty({
    description: 'Uma lista de salas que o professor lessiona',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsArray()
  classes?: { id: string }[];
}
