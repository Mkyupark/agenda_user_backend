import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from '../user/teacher.entity';
import { Institution } from '../user/institution.entity';
import { CourseCover } from '../user/coverImg.entity';

@Entity({ name: 'course' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  total_quiz?: string;

  @Column()
  level?: string;

  @Column()
  total_hour?: string;

  @Column()
  total_student?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at!: Date;

  @Column('real')
  price?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount?: number;

  @Column()
  language?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: null })
  total_rate?: string;

  @OneToOne(() => CourseCover, (courseCover) => courseCover.course)
  courseCover?: CourseCover;
  @ManyToOne(() => Teacher, (teacher) => teacher.course)
  @JoinColumn({
    name: 'teacher_id',
  })
  teacher!: Teacher;
  @ManyToOne(() => Institution, (institution) => institution.course)
  @JoinColumn({
    name: 'institution_id',
  })
  institution!: Institution;
}
