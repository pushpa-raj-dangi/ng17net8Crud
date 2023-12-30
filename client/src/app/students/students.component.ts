import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students$!: Observable<Student[]>
  studentService = inject(StudentsService);

  toasterService= inject(ToastrService)
  
  ngOnInit(): void {
    this.getStudents();

  }

  delete(id: number) {
    console.log(id);
    
    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.getStudents();
        this.toasterService.success("Sucessfully Deleted");
      },
      error: err => {
        console.log(err);
        this.toasterService.success("Sucessfully Deleted");

      }
    })
  }

  private getStudents(): void {
    this.students$ = this.studentService.getStudents()
  }


}
