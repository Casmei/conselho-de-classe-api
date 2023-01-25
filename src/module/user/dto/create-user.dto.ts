import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description:
      'O nome será utilizado para humanizar a referência do usuário da conta.',
    example: 'Tiago de Castro Lima',
  })
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Precisa ser do tipo email e único no sistema',
    example: 'casmei@protonmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '123456789',
  })
  @MinLength(8)
  @IsString()
  password: string;
}
