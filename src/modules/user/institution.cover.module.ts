import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InstitutionCover } from '../../entities/user/coverImg.entity';
import { Institution } from '../../entities/user/institution.entity';
import { InstitutionCoverController } from '../../controller/user/institution.cover.controller';
import { InstitutionCoverRepository } from '../../repository/user/institution.cover.repository';
import { InstitutionRepository } from '../../repository/user/institution.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([InstitutionCover, Institution]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [InstitutionCoverController],
  providers: [InstitutionCoverRepository, InstitutionRepository], // StudentRepository를 providers에 추가
})
export class instititutionCoverModule {}
