import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import { SkipJwt } from './decorators/skip-jwt.decorator';
import { SignupDTO } from './dto/signup.dto';

@Controller('/')
class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwt()
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipJwt()
  @Post('signup')
  async signup(@Body() data: SignupDTO) {
    console.log(data);
    return await this.authService.createUserAccount(data);
  }
}

export default AuthController;
