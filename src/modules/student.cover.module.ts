import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentCover } from '../entities/coverImg.entity';
import { StudentCoverController } from '../controller/user/student.cover.controller';
import { StudentCoverRepository } from '../repository/student.cover.repository';
import { StudentRepository } from '../repository/student.repository';
import { Student } from '../entities/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([StudentCover, Student]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [StudentCoverController],
  providers: [StudentCoverRepository, StudentRepository], // StudentRepository를 providers에 추가
})
export class studentCoverModule {}
