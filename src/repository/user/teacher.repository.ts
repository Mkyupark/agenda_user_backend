import { Injectable } from '@nestjs/common';
import { Teacher } from '../../entities/user/teacher.entity';
import { Repository } from 'typeorm'; // Repository를 'typeorm'에서 가져옵니다.
import { InjectRepository } from '@nestjs/typeorm'; // InjectRepository를 사용합니다.
import { TeacherDTO } from '../../dto/user/teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectRepository(Teacher) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<TeacherDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdate(teacherDTO: TeacherDTO) {
    return await this.repository.save(teacherDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['teacherCover'],
    });
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
  async findByInstitution(institution: any) {
    return await this.repository.find({
      where: {
        institution: institution,
      },
      relations: ['teacherCover'],
    });
  }
}
