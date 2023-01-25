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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiBearerAuth()
@ApiTags('Turma')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({
    summary: 'Cria uma nova classe no sistema',
  })
  @Post()
  create(@Body() data: CreateClassDto) {
    return this.classService.create(data);
  }

  @ApiOperation({
    summary: 'Retorna todas as classes encontradas no sistema',
  })
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @ApiOperation({
    summary: 'Retorna a classe referente ao id passado no parâmetro',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualiza algum valor da classe',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateClassDto) {
    return this.classService.update(id, data);
  }

  @ApiOperation({
    summary: 'Realiza uma softdelete da classe pelo id passado no parâmetro',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
