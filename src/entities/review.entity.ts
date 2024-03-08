import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './user/student.entity';
import { Course } from './course/course.entity';
import { Teacher } from './user/teacher.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 1000 })
  comment?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at!: Date;

  // 관계 설정
  @ManyToOne(() => Student)
  @JoinColumn({
    name: 'student_id',
  })
  student!: Student;

  @ManyToOne(() => Course)
  @JoinColumn({
    name: 'course_id',
  })
  course!: Course;

  @ManyToOne(() => Teacher)
  @JoinColumn({
    name: 'teacher_id',
  })
  teacher?: Teacher;
}
