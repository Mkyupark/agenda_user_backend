import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ImgCover } from './interface/img.abstract';
import { Student } from './student.entity';

@Entity({ name: 'student_cover' })
export class StudentCover extends ImgCover {
  @OneToOne(() => Student)
  @JoinColumn({
    name: 'student_id',
  })
  student!: Student;
}
