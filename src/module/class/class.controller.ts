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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { UserBelongsToIntance } from '../instance/guard/user-belongs-to-instance.guard';
import { userRoles } from '../user/protocols/user.protocols';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';

@ApiBearerAuth()
@ApiTags('Turma')
@VerifyRole(userRoles.MANAGER)
@UseGuards(UserBelongsToIntance)
@Controller('institutions')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post(':instance_id/classes')
  create(
    @Param('instance_id') instanceId: number,
    @Body() data: CreateClassDto,
  ) {
    return this.classService.create(instanceId, data);
  }

  @Get(':instance_id/classes')
  findAll(@Param('instance_id') instanceId: number) {
    return this.classService.findAll(instanceId);
  }

  // @ApiOperation({
  //   summary: 'Retorna a classe referente ao id passado no parâmetro',
  // })
  // @ApiBearerAuth()
  // @Get(':instance_id/class/:id')
  // findOne(@Param('id') id: string) {
  //   return this.classService.findOne(id);
  // }

  // @ApiOperation({
  //   summary: 'Atualiza algum valor da classe',
  // })
  // @ApiBearerAuth()
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: UpdateClassDto) {
  //   return this.classService.update(id, data);
  // }

  // @ApiOperation({
  //   summary: 'Realiza uma softdelete da classe pelo id passado no parâmetro',
  // })
  // @ApiBearerAuth()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.classService.remove(id);
  // }
}
