import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { CouncilModule } from './module/council/council.module';
import { CourseModule } from './module/course/course.module';
import { ClassModule } from './module/class/class.module';
import { SubjectModule } from './module/subject/subject.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { StudentModule } from './module/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './module/auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { typeOrmConfigAsync } from './config/database.config';
import { mailConfigAsync } from './config/mail.config';
import { bullConfigAsync } from './config/queue.config';
import RoleGuard from './module/auth/guards/role.guard';
import { InstanceModule } from './module/instance/instance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MailerModule.forRootAsync(mailConfigAsync),
    BullModule.forRootAsync(bullConfigAsync),
    AuthModule,
    UserModule,
    CouncilModule,
    CourseModule,
    ClassModule,
    SubjectModule,
    StudentModule,
    InstanceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
