import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { InstitutionCover } from './coverImg.entity';
import { UserRole } from '../enum/userRole';
import { Teacher } from './teacher.entity';
import { Course } from '../course/course.entity';

@Entity({ name: 'institution' })
export class Institution {
  // firebaseKey
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
  @Column()
  tel!: string;

  @Column()
  email!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  type!: UserRole;

  @OneToOne(() => InstitutionCover, (institutionCover) => institutionCover.institution)
  institutionCover!: InstitutionCover;

  @OneToMany(() => Teacher, (teacher) => teacher.institution)
  teacher?: Teacher;

  @OneToMany(() => Course, (course) => course.institution)
  course?: Course;
}
