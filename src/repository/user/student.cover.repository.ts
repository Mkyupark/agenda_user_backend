import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCoverDTO } from '../../dto/user/student.cover.dto';
import { StudentCover } from '../../entities/user/coverImg.entity';
import { Repository } from 'typeorm';
import { StudentDTO } from '../../dto/user/student.dto';

@Injectable()
export class StudentCoverRepository {
  constructor(
    @InjectRepository(StudentCover) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<StudentCoverDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async update(fileName: string, studentCoverDTO: StudentCoverDTO) {
    const existingCover = await this.repository.findOne({
      where: { file_name: fileName },
    });
    if (existingCover) {
      existingCover.file_name = studentCoverDTO.file_name;
      existingCover.file_url = studentCoverDTO.file_url;
      return await this.repository.save(existingCover);
    } else {
      return await this.repository.create(studentCoverDTO);
    }
  }
  async create(studentCoverDTO: StudentCoverDTO) {
    return await this.repository.save(studentCoverDTO);
  }
  async deletebyFilename(fileName: string) {
    return await this.repository.delete({ file_name: fileName });
  }
  async findbyFilename(fileName: string) {
    return await this.repository.findOne({
      where: {
        file_name: fileName,
      },
      relations: ['student'],
    });
  }
}
