import { CourseDTO } from './course/course.dto';
import { StudentDTO } from './user/student.dto';

export class SubscriptionDTO {
  id?: string;
  percent?: number;
  is_review?: boolean;
  start_at?: Date;
  end_at?: Date;
  student_id?: string;
  course_id?: string;
  is_purchase?: boolean;
  student?: StudentDTO;
  course?: CourseDTO;
}
