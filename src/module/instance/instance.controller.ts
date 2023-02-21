import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { InviteUserDto } from './dto/invite-user.dto';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { InstanceService } from './instance.service';
import { InviteGuard } from './guard/invite.guard';

@ApiTags('Instituição')
@Controller('institutions')
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

  @UseGuards(InviteGuard)
  @ApiBearerAuth()
  @Post('/invite/:code')
  enterByCode(@Param('code') code: string, @Req() req: any) {
    return this.instanceService.joinInstanceByCode(code, req.user);
  }

  @Post(':instance_id/invite')
  inviteUser(
    @Body() data: InviteUserDto,
    @Param('instance_id') instance_id: number,
    @Req() req: any,
  ) {
    return this.instanceService.inviteUser(data, +instance_id, req.user.id);
  }
}
