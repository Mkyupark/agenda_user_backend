import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TeacherCover } from '../../entities/user/coverImg.entity';
import { Teacher } from '../../entities/user/teacher.entity';
import { TeacherCoverController } from '../../controller/user/teacher.cover.controller';
import { TeacherCoverRepository } from '../../repository/user/teacher.cover.repository';
import { TeacherRepository } from '../../repository/user/teacher.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([TeacherCover, Teacher]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [TeacherCoverController],
  providers: [TeacherCoverRepository, TeacherRepository], // StudentRepository를 providers에 추가
})
export class teachercoverModule {}
