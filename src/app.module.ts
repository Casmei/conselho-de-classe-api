import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/guards/jwt.guard';
import { CouncilModule } from './module/council/council.module';
import { CourseModule } from './module/course/course.module';
import { ClassModule } from './module/class/class.module';
import { SubjectModule } from './module/subject/subject.module';
import RoleGuard from './module/auth/guards/role.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { StudentModule } from './module/student/student.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        secure: true,
        port: 465,
        auth: {
          user: 'desenvolvimento@singlex.com.br',
          pass: 'Dev@!!!1234',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
    CouncilModule,
    CourseModule,
    ClassModule,
    SubjectModule,
    StudentModule,
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
