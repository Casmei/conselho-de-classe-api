import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { InstanceService } from './instance.service';

@ApiTags('Instituição')
@Controller('institution')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma instituição' })
  @Post()
  create(@Body() createInstitutionDto: CreateInstanceDto, @Req() req: Request) {
    const user = req.user;
    return this.instanceService.create(user, createInstitutionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todas as instituições do usuário' })
  @Get()
  findAllByUserId(@Req() req: Request) {
    return this.instanceService.findAllByUser(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //TODO: implementar uma busca de instituição
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: UpdateInstanceDto,
  ) {
    //TODO: implementar edição de instituição
  }
}
