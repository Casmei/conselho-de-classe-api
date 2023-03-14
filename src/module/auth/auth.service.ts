import { Injectable, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

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
    let payload = await this.userService.findOne(user.id);
    const instancePayload = await this.userService.findOneWithInstance(user.id);
    payload = !instancePayload ? payload : instancePayload;
    
    const { id, name, email } = payload;
    const { id: instanceId, subscription_instance, role } = payload.userToInstance[0];

    return {
      access_token: this.jwtService.sign({
        id,
        name,
        email,
        instanceId,
        subscription_instance,
        role
      }),
    };
  }
}

export default AuthService;
