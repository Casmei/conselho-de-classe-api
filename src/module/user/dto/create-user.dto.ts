import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description:
      'O nome será utilizado para humanizar a referência do usuário da conta.',
    example: 'Tiago de Castro Lima',
  })
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Precisa ser do tipo email e único no sistema',
    example: 'casmei@protonmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '123456789',
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;
}
