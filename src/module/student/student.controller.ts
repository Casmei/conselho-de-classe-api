import {
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from './student.service';
import { UserBelongsToIntance } from '../instance/guard/user-belongs-to-instance.guard';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { userRoles } from '../user/protocols/user.protocols';

@ApiBearerAuth()
@ApiTags('Estudante')
// @VerifyRole(userRoles.MANAGER)
// @UseGuards(UserBelongsToIntance)
@Controller('institutions')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post(':instance_id/students')
  //TODO: validar tipo e limite de arquivo
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudents(
    @UploadedFile(ParseFilePipe) file,
    @Param('instance_id') instanceId: number,
  ) {
    const csvString: string = file.buffer.toString();
    return this.studentService.createParseCsv(instanceId, csvString);
  }

  @Get(':instance_id/students')
  async getAll(@Param('instance_id') instanceId: number) {
    return this.studentService.getAll(instanceId);
  }

  @Patch(':instance_id/students')
  @UseInterceptors(FileInterceptor('file'))
  async updateStudents(
    @UploadedFile(ParseFilePipe) file,
    @Param('instance_id') instanceId: number,
  ) {
    const csvString: string = file.buffer.toString();
    return this.studentService.updateStudentCsv(instanceId, csvString);
  }

  @Get(':instance_id/students')
  getAllInstanceStudens(
    @Param('instance_id') instance_id: number
  ) {
    return this.studentService.getAllByInstance(instance_id);
  }
}
