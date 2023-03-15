import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfigAsync } from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { InstanceModule } from '../instance/instance.module';
@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    InstanceModule,
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
