import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../model/Score';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  scoreForm: FormGroup;
  result: string;
  constructor(private scoreService: ScoreService, private formBuilder: FormBuilder,

  ) { }
  ngOnInit() {
    this.scoreForm = this.formBuilder.group({
      id: [''],
      grade1: [''],
      grade2: ['']
    });
  }

  get f() {
    return this.scoreForm.controls;
  }

  submitScore(): void {

    const score: Score = {
      TeacherID: this.f.id.value,
      grade1: this.f.grade1.value,
      grade2: this.f.grade2.value,
    };


    this.scoreService.score(score).subscribe(predictResponse => {
      this.result = predictResponse.prediction;
      console.log(this.result);
      return this.result;
    });
  }
  
  trainModel(): void {
    this.scoreService.train().subscribe(trainResponse => {
      console.log(trainResponse);
      alert("training succesful")
    });
  }

  getGraphs(): void {
    this.scoreService.graph().subscribe(graphResponse => {
      console.log(graphResponse);
    });
  }
} 
