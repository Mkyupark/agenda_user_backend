import { Course } from '../entities/course/course.entity';
import { Student } from '../entities/user/student.entity';
import { Teacher } from '../entities/user/teacher.entity';

export class ReviewDTO {
  id?: string;
  comment?: string;
  create_at?: Date;
  student?: Student;
  course?: Course;
  teacher?: Teacher;
}
