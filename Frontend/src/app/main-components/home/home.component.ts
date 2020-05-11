import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../model/Score';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  scoreForm: FormGroup;

  constructor(private scoreService: ScoreService,
  ) { }
  ngOnInit() {
    // this.scoreForm = this.formBuilder.group({
    //   id: [''],
    //   grade1: [''],
    //   grade2: ['']
    // });
  }

  get isInvalid() {
    return this.scoreForm.invalid;
  }
  get f() {
    return this.scoreForm.controls;
  }

  submitLogin(): void {
    if (this.isInvalid) {
      return;
    }

    const score: Score = {
      TeacherID: this.f.id.value,
      grade1: this.f.grade1.value,
      grade2: this.f.grade2.value,
    };


    this.scoreService.score(score).subscribe(loginResponse => {
      console.log(loginResponse);

    });
  }
} 
