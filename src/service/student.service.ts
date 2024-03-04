import { Injectable } from '@nestjs/common';
import { StudentDTO } from '../dto/student.dto';
import { StudentRepository } from '../repository/student.repository';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async createStudent(student: Student) {
    try {
      await this.studentRepository.createStudent(student);
      return 'ok';
    } catch (error) {
      throw error;
    }
  }
}
