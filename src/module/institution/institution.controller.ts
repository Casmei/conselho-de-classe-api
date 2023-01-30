import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Instituição')
@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma instituição' })
  @Post()
  create(
    @Body() createInstitutionDto: CreateInstitutionDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.institutionService.create(user, createInstitutionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todas as instituições do usuário' })
  @Get()
  findAllByUserId(@Req() req: Request) {
    return this.institutionService.findAllByUser(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //TODO: implementar uma busca de instituição
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: UpdateInstitutionDto,
  ) {
      //TODO: implementar edição de instituição
  }
}
