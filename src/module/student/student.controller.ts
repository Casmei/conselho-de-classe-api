import { Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Estudante')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('upload')
  uploadFile() {
    //todo: fazer sistema de upload de arquivo bem como o crud do aluno
  }
}
