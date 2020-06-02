import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { LogedInUserService } from '../../services/loged-in-user.service';
import { Ecoa } from "../../model/Ecoa";

@Component({
  selector: 'app-ecoa',
  templateUrl: './ecoa.component.html',
  styleUrls: ['./ecoa.component.scss']
})
export class EcoaComponent implements OnInit {
  scoreForm: FormGroup;

  // Handle Error
  scoreError: boolean;
  errorMessage: string;
  // Student and classes data
  subjectName: string;
  subjectTeacher: string;
  studentName: string;
  studentId: string;
  matricula: string;
  classes: [];
  questions: Object[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ecoaService: EcoaService,
    private logedInUserService: LogedInUserService,

  ) {

    this.scoreError = false;
  }

  ngOnInit() {
    this.matricula = this.logedInUserService.getCurrentUser().idStudent
    this.ecoaService.student(this.matricula).subscribe(
      (response) => {
        this.studentName = response.name;
        this.studentId = response._id;
        this.classes = response.classes;
        console.log(this.classes)
        return this.classes;
      },
      (err) => {
        this.errorMessage = err.statusText;
        console.log("HTTP Error", err);
      }
    );

    this.scoreForm = this.formBuilder.group({
      question1: ['', Validators.required],
      question2: ['', Validators.required],
      question3: ['', Validators.required],
      question4: ['', Validators.required],
      question5: ['', Validators.required],
    });
  }

  get f() {
    return this.scoreForm.controls;
  }
  submitScore(classId: string, profId: string): void {
    this.questions.push(this.f.question1.value);
    this.questions.push(this.f.question2.value);
    this.questions.push(this.f.question3.value);
    this.questions.push(this.f.question4.value);
    this.questions.push(this.f.question5.value);

    const ecoa: Ecoa = {
      questions: this.questions,
      idStudent: this.studentId,
      idProfessor: profId,
      idClass: classId
    };
    console.log('====================================');
    console.log(ecoa);
    console.log('====================================');
    this.ecoaService.ecoa(ecoa).subscribe(
      (response) => {
        console.log(response)
      },
      (err) => {
        this.errorMessage = err.statusText;
        console.log("HTTP Error", err);
      }
    );
    this.questions = [];
  }

}
