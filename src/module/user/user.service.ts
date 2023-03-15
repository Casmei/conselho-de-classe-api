import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { AuthLoginDTO } from '../auth/dto/auth-login.dto';
import { AuthRegisterDTO } from '../auth/dto/auth-register.dto';
import { UserStatus } from './protocols/user.protocols';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(userCredentials: AuthRegisterDTO) {
    await this.existsEmail(userCredentials.email);

    return await this.userRepository.save({
      ...userCredentials,
      status: UserStatus.ACTIVE,
    });
  }

  async findAll() {
    return await this.userRepository.find({
      select: { id: true, name: true, email: true },
    });
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneBy({ id: String(id) });
    } catch (error) {
      throw new BadRequestException(
        'an error was triggered when searching for the user',
      );
    }
  }

  async findOneWithInstance(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.userToInstance', 'userInstance')
        .where('userInstance.userId = :user_id', { user_id: id })
        .getOne();
    } catch (exception) {
      throw new BadRequestException(
        'this user is an Instance Manager'
      );
    }
  }

  async findOneByCredentials(credentials: AuthLoginDTO) {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      return user;
    }

    return undefined;
  }

  private async existsEmail(email: string) {
    const user = await this.userRepository.countBy({
      email,
    });

    if (!!user) {
      throw new BadRequestException('invalid email');
    }
  }

  async decodePayload(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    return this.jwtService.decode(token);
  }
}
