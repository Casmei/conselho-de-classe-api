import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouncilDto } from './dto/create-council.dto';
import { UpdateCouncilDto } from './dto/update-council.dto';
import { Council } from './entities/council.entity';

@Injectable()
export class CouncilService {
  constructor(
    @InjectRepository(Council)
    private readonly councilRepository: Repository<Council>,
  ) {}

  create(createCouncilDto: CreateCouncilDto, userId: string) {
    try {
      return this.councilRepository.save({
        ...createCouncilDto,
        owner: { id: userId },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    try {
      return this.councilRepository.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.councilRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateCouncilDto: UpdateCouncilDto) {
    try {
      return this.councilRepository.update(id, {
        ...updateCouncilDto,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} council`;
  }
}
