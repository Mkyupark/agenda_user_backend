import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './user/student.entity';
import { Course } from './course/course.entity';

@Entity({ name: 'subscription' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  percent?: number;

  @Column({ type: 'boolean', default: false })
  is_review?: boolean;

  @Column({ type: 'boolean', default: false })
  is_purchase?: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  start_at!: Date;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  end_at!: Date;

  // 관계설정
  // 학생
  @ManyToOne(() => Student, (student) => student.subscription, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'student_id',
  })
  student!: Student;

  // 강의 정보
  @ManyToOne(() => Course, (course) => course.subscription)
  @JoinColumn({
    name: 'course_id',
  })
  course!: Course;
}
