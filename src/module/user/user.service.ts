import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { LoginUser } from './dto/login-user.dto';
import { SignupDTO } from '../auth/dto/signup.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { userRoles } from './role.enum';
import { TeacherLoginMailConsumer } from './jobs/teacher-login-mail.consumer';
import { TeacherLoginMailProducer } from './jobs/teacher-login-mail.producer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly teacherLoginMailProducer: TeacherLoginMailProducer,
  ) {}

  async create(userCredentials: SignupDTO) {
    return await this.userRepository.save(userCredentials);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findBy({ id: String(id) });
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

  async findOneByCredentials(credentials: LoginUser) {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      return user;
    }

    return undefined;
  }

  async createTeacher(data: CreateTeacherDto) {
    const password = crypto.randomUUID().slice(0, 6);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
      role: userRoles.TEACHER,
    });

    this.teacherLoginMailProducer.sendMail({
      name: user.name,
      email: data.email,
      password,
    });

    return this.userRepository.insert(user);
  }
}
