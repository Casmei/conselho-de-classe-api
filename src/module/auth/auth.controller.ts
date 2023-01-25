import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import { SkipJwt } from './decorators/skip-jwt.decorator';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Autentica um usuário previamente cadastrado no sistema',
  })
  @SkipJwt()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async signin(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Cadastra um usuário no sistema',
  })
  @SkipJwt()
  @Post('register')
  async signup(@Body() data: AuthRegisterDTO) {
    return await this.authService.createUserAccount(data);
  }
}

export default AuthController;
