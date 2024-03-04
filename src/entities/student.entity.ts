import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentCover } from './coverImg.entity';
import { UserRole } from './enum/userRole';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ default: null })
  is_login?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  type!: UserRole;

  // @OneToOne(() => StudentCover, (imgcover) => imgcover.student)
  // img_id?: StudentCover;
}
