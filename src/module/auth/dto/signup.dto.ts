import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @MinLength(3)
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
