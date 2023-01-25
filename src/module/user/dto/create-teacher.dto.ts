import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateTeacherDto extends PickType(CreateUserDto, [
  'name',
  'email',
]) {
  @ApiProperty({
    description: 'Uma lista de disciplinas que o professor ensina',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsArray()
  subjects: { id: string }[];

  @ApiProperty({
    description: 'Uma lista de salas que o professor lessiona',
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsArray()
  classes: { id: string }[];
}
