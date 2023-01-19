import { Injectable } from '@nestjs/common';
import { LoginUser } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { SignupDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(credentials: LoginUser) {
    return await this.userService.findOneByCredentials(credentials);
  }

  async createUserAccount(credentials: SignupDTO) {
    credentials.password = await bcrypt.hash(credentials.password, 10);

    return await this.userService.create(credentials);
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export default AuthService;
