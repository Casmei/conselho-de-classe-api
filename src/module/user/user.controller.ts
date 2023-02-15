import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Usuário')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }

  @ApiOperation({ summary: 'Retorna um usuário do sistema' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
