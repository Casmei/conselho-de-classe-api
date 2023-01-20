import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/role.enum';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @VerifyRole(userRoles.MANAGER)
  @Post()
  create(@Body() data: CreateCourseDto) {
    return this.courseService.create(data);
  }

  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @VerifyRole(userRoles.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @VerifyRole(userRoles.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
