import { Injectable } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: AuthLoginDTO) {
    return await this.userService.findOneByCredentials(credentials);
  }

  async createUserAccount(credentials: AuthRegisterDTO) {
    credentials.password = await bcrypt.hash(credentials.password, 10);
    return await this.userService.create(credentials);
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export default AuthService;
