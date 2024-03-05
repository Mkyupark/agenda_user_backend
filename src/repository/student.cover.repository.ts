import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCoverDTO } from '../dto/student.cover.dto';
import { StudentCover } from '../entities/coverImg.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentCoverRepository {
  constructor(
    @InjectRepository(StudentCover) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<StudentCoverDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createStudentCover(studentCoverDTO: StudentCoverDTO) {
    return await this.repository.save(studentCoverDTO);
  }
  async deleteStudentCover(fileName: string) {
    return await this.repository.delete({ file_name: fileName });
  }
}
