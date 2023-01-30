import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CouncilService } from './council.service';
import { CreateCouncilDto } from './dto/create-council.dto';
import { UpdateCouncilDto } from './dto/update-council.dto';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Conselho de Classe')
@Controller('councils')
export class CouncilController {
  constructor(private readonly councilService: CouncilService) {}

  @ApiOperation({ summary: 'Cria um novo conselho no sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Post()
  //TODO: tipar minha request
  create(@Body() createCouncilDto: CreateCouncilDto, @Request() req: any) {
    return this.councilService.create(createCouncilDto, req.user.sub);
  }

  @ApiOperation({ summary: 'Retorna todos os conselhos do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.councilService.findAll();
  }

  @ApiOperation({ summary: 'Retorna somente um conselho do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.councilService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um conselho do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouncilDto: UpdateCouncilDto) {
    return this.councilService.update(id, updateCouncilDto);
  }

  @ApiOperation({ summary: 'Deleta um conselho do sistema' })
  @VerifyRole(userRoles.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.councilService.remove(+id);
  }
}
