import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Teacher } from '../../entities/user/teacher.entity';
import { TeacherController } from '../../controller/user/teacher.controller';
import { TeacherRepository } from '../../repository/user/teacher.repository';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { Institution } from '../../entities/user/institution.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Teacher, Institution])],
  controllers: [TeacherController],
  providers: [TeacherRepository, InstitutionRepository], // service 넣을꺼면 앞에다 넣어야함.
})
export class teacherModule {}


