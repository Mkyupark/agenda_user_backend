import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from '../../entities/user/institution.entity';
import { Repository } from 'typeorm';
import { InstitutionDTO } from '../../dto/user/institution.dto';

@Injectable()
export class InstitutionRepository {
  constructor(
    @InjectRepository(Institution) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<InstitutionDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdate(institutionDTO: InstitutionDTO) {
    return await this.repository.save(institutionDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['institutionCover'],
    });
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
