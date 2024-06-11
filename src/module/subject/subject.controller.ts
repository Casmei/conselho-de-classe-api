import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userRoles } from '../user/protocols/user.protocols';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@ApiBearerAuth()
@ApiTags('Disciplina')
@Controller('institutions')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Cria uma nova disciplina' })
  @VerifyRole(userRoles.MANAGER)
  @Post('subjects')
  create(@Body() data: CreateSubjectDto) {
    return this.subjectService.create(data);
  }

  @ApiOperation({ summary: 'Retorna todas as disciplinas' })
  @VerifyRole(userRoles.MANAGER)
  @Get('subjects')
  findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'Retorna uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Get('subject/:id')
  findOne(@Param() param: { id: string }) {
    return this.subjectService.findOne(param.id);
  }

  @ApiOperation({ summary: 'Atualiza uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Patch('subjects/:id')
  update(
    @Param() param: { id: string; instanceId: number },
    @Body() data: UpdateSubjectDto,
  ) {
    return this.subjectService.update(param.id, data);
  }

  @ApiOperation({ summary: 'Deleta uma disciplina pelo id' })
  @VerifyRole(userRoles.MANAGER)
  @Delete('subjects/:id')
  remove(@Param() param: { id: string; instanceId: number }) {
    return this.subjectService.remove(param.id);
  }
}
