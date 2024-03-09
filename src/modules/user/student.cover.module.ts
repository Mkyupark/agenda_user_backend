import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentCover } from '../../entities/user/coverImg.entity';
import { StudentCoverController } from '../../controller/user/student.cover.controller';
import { StudentCoverRepository } from '../../repository/user/student.cover.repository';
import { StudentRepository } from '../../repository/user/student.repository';
import { Student } from '../../entities/user/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([StudentCover, Student]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [StudentCoverController],
  providers: [StudentCoverRepository, StudentRepository], // StudentRepository를 providers에 추가
})
export class studentCoverModule {}
