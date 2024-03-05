import { Injectable } from '@nestjs/common';
import { StudentDTO } from 'src/dto/student.dto';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm'; // Repository를 'typeorm'에서 가져옵니다.
import { InjectRepository } from '@nestjs/typeorm'; // InjectRepository를 사용합니다.

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<StudentDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdateStudent(studentDTO: StudentDTO) {
    return await this.repository.save(studentDTO);
  }
  async findStudentById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['studentCover'],
    });
  }
  async deleteStudentById(id: string) {
    return await this.repository.delete(id);
  }
}
