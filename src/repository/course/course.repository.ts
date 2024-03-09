import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course/course.entity';
import { Repository } from 'typeorm';
import { CourseDTO } from 'src/dto/course/course.dto';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<CourseDTO>
  ) {}

  async createOrUpdate(courseDTO: CourseDTO) {
    return await this.repository.save(courseDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['courseCover'],
    });
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
