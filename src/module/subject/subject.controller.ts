import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Disciplina')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Cria uma nova disciplina' })
  @VerifyRole(userRoles.MANAGER)
  @Post()
  create(@Body() data: CreateSubjectDto) {
    return this.subjectService.create(data);
  }

  @ApiOperation({ summary: 'Retorna todas as disciplinas' })
  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'Retorna uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleta uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
