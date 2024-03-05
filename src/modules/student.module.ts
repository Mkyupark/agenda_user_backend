import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { studentController } from '../controller/user/student.controller';
import { ConfigModule } from '@nestjs/config';
import { Student } from '../entities/student.entity';
import { StudentRepository } from '../repository/student.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Student])],
  controllers: [studentController],
  providers: [StudentRepository], // service 넣을꺼면 앞에다 넣어야함.
})
export class studentModule {}
