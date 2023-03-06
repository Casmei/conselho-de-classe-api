import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { UserBelongsToIntance } from '../instance/guard/user-belongs-to-instance.guard';
import { userRoles } from '../user/protocols/user.protocols';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiBearerAuth()
@ApiTags('Turma')
@UseGuards(UserBelongsToIntance)
@VerifyRole(userRoles.MANAGER)
@Controller('institutions')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({
    summary: 'Cria um turma referente a instituição',
  })
  @Post(':instance_id/classes')
  create(
    @Param('instance_id') instanceId: number,
    @Body() data: CreateClassDto,
  ) {
    return this.classService.create(instanceId, data);
  }

  @ApiOperation({
    summary: 'Retorna todas as turma de determinada instituição',
  })
  @Get(':instance_id/classes')
  findAll(@Param('instance_id') instanceId: number) {
    return this.classService.findAll(instanceId);
  }

  @ApiOperation({
    summary: 'Retorna uma turma de determinada instituição pelo seu ID',
  })
  @Get(':instance_id/classes/:id')
  findOne(@Param() data: { instanceId: number; id: string }) {
    return this.classService.findOne(data.instanceId, data.id);
  }

  @ApiOperation({
    summary: 'Atualiza uma turma de determinada instituição',
  })
  @Patch(':instance_id/classes/:id')
  update(
    @Param() paramData: { instanceId: number; id: string },
    @Body() bodyData: UpdateClassDto,
  ) {
    return this.classService.update(
      paramData.instanceId,
      paramData.id,
      bodyData,
    );
  }

  @ApiOperation({
    summary:
      'Realiza uma softdelete da turma de terminada instituição pelo id passado no parâmetro',
  })
  @ApiBearerAuth()
  @Delete(':instance_id/classes/:id')
  remove(@Param() data: { instanceId: number; id: string }) {
    return this.classService.remove(data.instanceId, data.id);
  }
}
