import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TeacherCover } from './coverImg.entity';
import { UserRole } from '../enum/userRole';
import { Institution } from './institution.entity';
import { NoticeBoard } from '../board/notice.board.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  // firebaseKey
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  subject!: string;

  @Column()
  language!: string;

  @Column({ default: null })
  country?: string;

  @Column({ type: 'timestamp', default: null })
  login_at?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at!: Date;

  @Column({ default: false })
  is_login?: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  type!: UserRole;

  @OneToOne(() => TeacherCover, (TeacherCover) => TeacherCover.teacher)
  teacherCover?: TeacherCover;

  @ManyToOne(() => Institution, (institution) => institution.teacher)
  @JoinColumn({
    name: 'institution_id',
  })
  institution!: Institution;

  @OneToMany(() => NoticeBoard, (noticeBoard) => noticeBoard.teacher)
  noticeBoard?: NoticeBoard;
}
