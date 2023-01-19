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

@Controller('council')
export class CouncilController {
  constructor(private readonly councilService: CouncilService) {}

  @VerifyRole(userRoles.MANAGER)
  @Post()
  create(@Body() createCouncilDto: CreateCouncilDto, @Request() req) {
    return this.councilService.create(createCouncilDto, req.user.sub);
  }

  @VerifyRole(userRoles.MANAGER)
  @Get()
  findAll() {
    return this.councilService.findAll();
  }

  @VerifyRole(userRoles.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.councilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouncilDto: UpdateCouncilDto) {
    return this.councilService.update(id, updateCouncilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.councilService.remove(+id);
  }
}
