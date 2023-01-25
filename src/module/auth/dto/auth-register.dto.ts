import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';

export class AuthRegisterDTO extends PickType(CreateUserDto, [
  'email',
  'name',
  'password',
]) {}
