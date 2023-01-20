import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @MinLength(3)
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsArray()
  subjects: { id: string }[];

  @IsArray()
  classes: { id: string }[];
}
