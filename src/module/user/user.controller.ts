import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { userRoles } from './protocols/user.protocols';
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

  @ApiOperation({ summary: 'Retorna um usuário do sistema' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Cria conta para um professor' })
  @VerifyRole(userRoles.MANAGER)
  @Post('teacher')
  createTeacher(@Body() data: CreateTeacherDto) {
    return this.userService.createTeacher(data);
  }

  @VerifyRole(userRoles.MANAGER)
  @Post('/invite/:instance_id')
  inviteUser(
    @Body() data: InviteUserDto,
    @Param('instance_id') instance_id,
    @Req() req: any,
  ) {
    return this.userService.inviteUser(data, +instance_id, req.user.id);
  }
}
