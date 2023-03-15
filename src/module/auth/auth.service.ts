import { Injectable, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InstanceService } from '../instance/instance.service';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private instanceService: InstanceService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: AuthLoginDTO) {
    return await this.userService.findOneByCredentials(credentials);
  }

  async createUserAccount(credentials: AuthRegisterDTO) {
    credentials.password = await bcrypt.hash(credentials.password, 10);
    return await this.userService.create(credentials);
  }

  async login({ id }: any) {
    const user = await this.userService.findOneWithInstance(id);

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
        instanceId: user.userToInstance[0].instance.id,
        role: user.userToInstance[0].role,
      }),
    };
  }
}

export default AuthService;
