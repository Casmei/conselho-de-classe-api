import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { userRoles } from './role.enum';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @VerifyRole(userRoles.MANAGER)
  @Post('teacher')
  createTeacher(@Body() data: CreateTeacherDto) {
    try {
      return this.userService.createTeacher(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
