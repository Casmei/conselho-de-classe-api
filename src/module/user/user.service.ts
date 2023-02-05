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
import { TeacherLoginMailProducer } from './jobs/teacher-login-mail.producer';
import { userRoles, UserStatus } from './protocols/user.protocols';
import { InviteUserDto } from './dto/invite-user.dto';
import { InviteUser } from './entities/invite-user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(InviteUser)
    private readonly inviteUserRespository: Repository<InviteUser>,
    private readonly teacherLoginMailProducer: TeacherLoginMailProducer,
    private readonly mailerService: MailerService,
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

    // this.teacherLoginMailProducer.sendMail({
    //   name: user.name,
    //   email: userCredentials.email,
    //   password,
    // });

    return this.userRepository.insert(user);
  }

  async inviteUser(data: InviteUserDto, instance_id: number, user_id: string) {
    console.log('🚀 ~ data', data);

    const code = crypto.randomUUID().slice(0, 6);
    await this.inviteUserRespository.save({
      code,
      instance: { id: instance_id },
      owner_invite: { id: user_id },
      invite_extra_data: {
        userData: {
          role: data.role,
          classes: data.classes,
          subjects: data.subjects,
        },
        status: UserStatus.INVITED,
      },
    });

    this.teacherLoginMailProducer.sendMail({
      email: data.email,
      code,
    });
  }

  private async existsEmail(email: string) {
    const user = await this.userRepository.countBy({
      email,
    });

    if (!!user) {
      throw new BadRequestException('invalid email');
    }
  }
}
