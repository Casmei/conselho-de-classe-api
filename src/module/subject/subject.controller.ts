import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userRoles } from '../user/protocols/user.protocols';
import { UserBelongsToIntance } from '../instance/guard/user-belongs-to-instance.guard';

@UseGuards(UserBelongsToIntance)
@ApiBearerAuth()
@ApiTags('Disciplina')
@Controller('institutions')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Cria uma nova disciplina' })
  @VerifyRole(userRoles.MANAGER)
  @UseGuards(UserBelongsToIntance)
  @Post(':instance_id/subjects')
  create(
    @Body() data: CreateSubjectDto,
    @Param('instance_id', ParseIntPipe) instanceId,
  ) {
    return this.subjectService.create(instanceId, data);
  }

  @ApiOperation({ summary: 'Retorna todas as disciplinas' })
  @VerifyRole(userRoles.MANAGER)
  @Get(':instance_id/subjects')
  findAll(@Param('instance_id', ParseIntPipe) instanceId) {
    return this.subjectService.findAll(instanceId);
  }

  // @ApiOperation({ summary: 'Retorna uma disciplina pelo id' })
  // @VerifyRole(userRoles.MANAGER)
  // @Get(':instance_id/subject/:id')
  // findOne(@Param() param: { id: string; instance_id: number }) {
  //   //TODO: tratar o UUID
  //   return this.subjectService.findOne(+param.instance_id, param.id);
  // }

  // @ApiOperation({ summary: 'Atualiza uma disciplina pelo id' })
  // @VerifyRole(userRoles.MANAGER)
  // @Patch(':instance_id/subjects/:id')
  // update(
  //   @Param() param: { id: string; instanceId: number },
  //   @Body() data: UpdateSubjectDto,
  // ) {
  //   return this.subjectService.update(+param.instanceId, param.id, data);
  // }

  // @ApiOperation({ summary: 'Deleta uma disciplina pelo id' })
  // @VerifyRole(userRoles.MANAGER)
  // @Delete(':instance_id/subjects/:id')
  // remove(@Param() param: { id: string; instanceId: number }) {
  //   return this.subjectService.remove(+param.instanceId, param.id);
  // }
}
