import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { StudentCover } from './coverImg.entity';
import { UserRole } from '../enum/userRole';
import { Subscription } from '../subscription.entity';

@Entity({ name: 'student' })
export class Student {
  // firebaseKey
  @PrimaryColumn()
  id!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  country!: string;

  @Column({ default: null })
  phone_num?: string;

  @Column({ default: null })
  about?: string;

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

  // 방향 집어 넣는것, 테이블에는 방향이 없는데, join을 쉽게 해주기 위해 orm에서 정의해준 것
  // 양방향으로 정의했는데, studentCover에서는 student를 참조 할 필요가 없는거 같다.
  // 나중에 코드 리펙토링 할때 삭제해보기.
  @OneToOne(() => StudentCover, (studentCover) => studentCover.student)
  studentCover?: StudentCover;

  @OneToMany(() => Subscription, (subscription) => subscription.student)
  subscription?: Subscription;
}
