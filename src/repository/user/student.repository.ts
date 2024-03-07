import { Injectable } from '@nestjs/common';
import { StudentDTO } from 'src/dto/user/student.dto';
import { Student } from '../../entities/user/student.entity';
import { Repository } from 'typeorm'; // Repository를 'typeorm'에서 가져옵니다.
import { InjectRepository } from '@nestjs/typeorm'; // InjectRepository를 사용합니다.

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<StudentDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdate(studentDTO: StudentDTO) {
    return await this.repository.save(studentDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['studentCover'],
    });
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
