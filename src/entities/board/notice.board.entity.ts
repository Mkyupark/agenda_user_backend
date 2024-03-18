import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Institution } from '../user/institution.entity';
import { Teacher } from '../user/teacher.entity';

@Entity({ name: 'notice_board' })
export class NoticeBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  //text type에는 default 값 불가능
  @Column({
    type: 'text',
  })
  content?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  fix?: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at!: Date;

  // updateDateColumn 에는 default 값 설정 불가능
  @UpdateDateColumn({
    type: 'timestamp',
  })
  update_at?: Date;

  @ManyToOne(() => Institution, (institution) => institution.noticeBoard)
  @JoinColumn({
    name: 'institution_id',
  })
  institution!: Institution;
}
