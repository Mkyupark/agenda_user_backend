import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCover } from '../../entities/user/coverImg.entity';
import { Repository } from 'typeorm';
import { CourseCoverDTO } from '../../dto/course/course.cover.dto';

@Injectable()
export class CourseCoverRepository {
  constructor(
    @InjectRepository(CourseCover) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<CourseCoverDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdate(fileName: string, courseCoverDTO: CourseCoverDTO) {
    const existingCover = await this.repository.findOne({
      where: { file_name: fileName },
    });
    if (existingCover) {
      existingCover.file_name = courseCoverDTO.file_name;
      existingCover.file_url = courseCoverDTO.file_url;
      return await this.repository.save(existingCover);
    } else {
      const newCover = this.repository.create(courseCoverDTO);
      return await this.repository.save(newCover);
    }
  }
  async create(courseCoverDTO: CourseCoverDTO) {
    return await this.repository.save(courseCoverDTO);
  }
  async deletebyFilename(fileName: string) {
    return await this.repository.delete({ file_name: fileName });
  }
}
