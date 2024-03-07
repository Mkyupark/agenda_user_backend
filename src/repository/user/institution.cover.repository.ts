import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionCover } from '../../entities/user/coverImg.entity';
import { Repository } from 'typeorm';
import { InstitutionCoverDTO } from '../../dto/user/institution.cover.dto';

@Injectable()
export class InstitutionCoverRepository {
  constructor(
    @InjectRepository(InstitutionCover) // Student 엔티티를 주입합니다.
    private readonly repository: Repository<InstitutionCoverDTO> // Repository<Student> 타입으로 주입합니다.
  ) {}

  async createOrUpdate(fileName: string, institutionCoverDTO: InstitutionCoverDTO) {
    const existingCover = await this.repository.findOne({
      where: { file_name: fileName },
    });
    if (existingCover) {
      existingCover.file_name = institutionCoverDTO.file_name;
      existingCover.file_url = institutionCoverDTO.file_url;
      return await this.repository.save(existingCover);
    } else {
      const newCover = this.repository.create(institutionCoverDTO);
      return await this.repository.save(newCover);
    }
  }
  async create(institutionCoverDTO: InstitutionCoverDTO) {
    return await this.repository.save(institutionCoverDTO);
  }
  // async deletebyFilename(fileName: string) {
  //   return await this.repository.delete({ file_name: fileName });
  // }
}
