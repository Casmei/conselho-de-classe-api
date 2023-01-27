import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { AuthLoginDTO } from '../auth/dto/auth-login.dto';
import { AuthRegisterDTO } from '../auth/dto/auth-register.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { userRoles } from './role.enum';
import { TeacherLoginMailProducer } from './jobs/teacher-login-mail.producer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly teacherLoginMailProducer: TeacherLoginMailProducer,
  ) {}

  async create(userCredentials: AuthRegisterDTO) {
    await this.existsEmail(userCredentials.email);

    return await this.userRepository.save(userCredentials);
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'an error was triggered when searching for the user',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
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

  async createTeacher(userCredentials: CreateTeacherDto) {
    await this.existsEmail(userCredentials.email);

    const password = crypto.randomUUID().slice(0, 6);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = this.userRepository.create({
      ...userCredentials,
      password: hashedPassword,
      role: userRoles.TEACHER,
    });

    this.teacherLoginMailProducer.sendMail({
      name: user.name,
      email: userCredentials.email,
      password,
    });

    return this.userRepository.insert(user);
  }

  private async existsEmail(email: string) {
    const user = await this.userRepository.countBy({
      email,
    });

    if (!!user) {
      throw new BadRequestException('Already existing email');
    }
  }
}
