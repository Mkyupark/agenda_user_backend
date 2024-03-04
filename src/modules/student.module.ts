import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { studentController } from '../controller/user/student.controller';
import { StudentService } from '../service/student.service';
import { StudentRepository } from '../repository/student.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Student])],
  controllers: [studentController],
  providers: [StudentService, StudentRepository],
})
export class studentModule {}
