import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ImgCover } from '../interface/img.abstract';
import { Student } from './student.entity';
import { Institution } from './institution.entity';
import { Teacher } from './teacher.entity';
import { Course } from '../course/course.entity';

@Entity({ name: 'student_cover' })
export class StudentCover extends ImgCover {
  @OneToOne(() => Student, (student) => student.studentCover, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'student_id',
  })
  student!: Student;
}

@Entity({ name: 'institution_cover' })
export class InstitutionCover extends ImgCover {
  @OneToOne(() => Institution, (institution) => institution.institutionCover, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'institution_id',
  })
  institution!: Institution;
}

@Entity({ name: 'teacher_cover' })
export class TeacherCover extends ImgCover {
  @OneToOne(() => Teacher, (teacher) => teacher.teacherCover, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'teacher_id',
  })
  teacher!: Teacher;
}

@Entity({ name: 'course_cover' })
export class CourseCover extends ImgCover {
  @OneToOne(() => Course, (course) => course.courseCover, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'course_id',
  })
  course!: Course;
}

@Entity({ name: 'file_data' })
export class FileData extends ImgCover {
  @ManyToOne(() => Course, (course) => course.fileData, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'course_id',
  })
  course!: Course;
}
