import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/protocols/user.protocols';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiBearerAuth()
@ApiTags('Curso')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Cria um novo curso no sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Post(':instance_id')
  create(
    @Body() data: CreateCourseDto,
    @Param('instance_id', ParseIntPipe) instanceId: number,
  ) {
    return this.courseService.create(instanceId, data);
  }

  @ApiOperation({ summary: 'Retorna todos os cursos do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Retorna um curso do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: 'Edita um curso do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Deleta um curso do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
