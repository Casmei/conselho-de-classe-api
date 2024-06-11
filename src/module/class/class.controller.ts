import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/protocols/user.protocols';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiBearerAuth()
@ApiTags('Turma')
@VerifyRole(userRoles.MANAGER)
@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({
    summary: 'Cria um turma referente a instituição',
  })
  @Post('classes')
  create(@Body() data: CreateClassDto) {
    return this.classService.create(data);
  }

  @ApiOperation({
    summary: 'Retorna todas as turma de determinada instituição',
  })
  @Get('classes')
  findAll() {
    return this.classService.findAll();
  }

  @ApiOperation({
    summary: 'Retorna uma turma de determinada instituição pelo seu ID',
  })
  @Get('classes/:id')
  findOne(@Param() id: string) {
    return this.classService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualiza uma turma de determinada instituição',
  })
  @Patch('classes/:id')
  update(@Param() id: string, @Body() bodyData: UpdateClassDto) {
    return this.classService.update(id, bodyData);
  }

  @ApiOperation({
    summary:
      'Realiza uma softdelete da turma de terminada instituição pelo id passado no parâmetro',
  })
  @ApiBearerAuth()
  @Delete('classes/:id')
  remove(@Param() id: string) {
    return this.classService.remove(id);
  }
}
