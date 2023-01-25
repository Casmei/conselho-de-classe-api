import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';

export class AuthLoginDTO extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
