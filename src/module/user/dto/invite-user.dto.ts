import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { userRoles } from '../protocols/user.protocols';

export class InviteUserDto {
  @ApiProperty({
    description: 'Email do usuário a ser convidado',
    example: 'casmei@protonmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(userRoles)
  role: userRoles;

  @ApiProperty({
    description: 'Uma lista de disciplinas que o professor ensina',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsOptional()
  subjects?: { id: string }[];

  @ApiProperty({
    description: 'Uma lista de salas que o professor lessiona',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsOptional()
  classes?: { id: string }[];
}
