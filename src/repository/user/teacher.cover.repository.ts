import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherCoverDTO } from '../../dto/user/teacher.cover.dto';
import { TeacherCover } from '../../entities/user/coverImg.entity';

@Injectable()
export class TeacherCoverRepository {
  constructor(
    @InjectRepository(TeacherCover) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<TeacherCoverDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async update(fileName: string, teacherCoverDTO: TeacherCoverDTO) {
    const existingCover = await this.repository.findOne({
      where: { file_name: fileName },
    });
    if (existingCover) {
      existingCover.file_name = teacherCoverDTO.file_name;
      existingCover.file_url = teacherCoverDTO.file_url;
      return await this.repository.save(existingCover);
    } else {
      return await this.repository.create(teacherCoverDTO);
    }
  }
  async create(teacherCoverDTO: TeacherCoverDTO) {
    return await this.repository.save(teacherCoverDTO);
  }
  async deletebyFilename(fileName: string) {
    return await this.repository.delete({ file_name: fileName });
  }
  async findbyFilename(fileName: string) {
    return await this.repository.findOne({
      where: {
        file_name: fileName,
      },
    });
  }
}
