import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/role.enum';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @VerifyRole(userRoles.MANAGER)
  @Post()
  create(@Body() data: CreateSubjectDto) {
    return this.subjectService.create(data);
  }

  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @VerifyRole(userRoles.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectService.update(id, data);
  }

  @VerifyRole(userRoles.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
