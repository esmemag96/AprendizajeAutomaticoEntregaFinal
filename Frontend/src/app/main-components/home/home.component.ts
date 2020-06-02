import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import Chart from 'chart.js';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ScoreService } from "../../services/score.service";
import { Score } from "../../model/Score";
import { Graph } from "../../model/Graph";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  scoreForm: FormGroup;
  result: number;
  imagePath: any;
  // Handle Loading
  isLoadingFinalScore: boolean;
  isLoadingTrainModel: boolean;
  // Handle Error
  scoreError: boolean;
  trainModelError: boolean;
  trainModelSucces: boolean;
  errorMessage: string;

  predictionColor: string;

  constructor(
    private scoreService: ScoreService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer
    
  ) {
    this.isLoadingFinalScore = false;
    this.isLoadingTrainModel = false;

    this.scoreError = false;
    this.trainModelError = false;
    this.trainModelSucces = false;
  }

  ngOnInit() {
    this.scoreForm = this.formBuilder.group({
      teacherId: ['', Validators.required ],
      classId: ['', Validators.required ],
      grade1: ['', Validators.required ],
      grade2: ['', Validators.required ],
    });
    //this.getGraphs(-1);
  }

  get f() {
    return this.scoreForm.controls;
  }

  submitScore(): void {
    this.isLoadingFinalScore = true;

    const score: Score = {
      TeacherID: this.f.teacherId.value,
      ClassID: this.f.classId.value,
      grade1: this.f.grade1.value,
      grade2: this.f.grade2.value
    };
    const graph: Graph = {
      teacherID: this.f.teacherId.value,
      classID: this.f.classId.value
    };
    this.scoreService.score(score).subscribe(
      (predictResponse) => {
        console.log(predictResponse)
        this.isLoadingFinalScore = false;
        this.result = predictResponse.predictionResult;
        this.result = Math.round(Number(this.result) * 100)/100;

        if(this.result >= 70){
          this.predictionColor = "rgb(51, 153, 22)";
        }else if(this.result < 70 && this.result >= 40){
          this.predictionColor = "rgb(254, 166, 2)";
        }else{
          this.predictionColor = "rgb(226, 27, 60)";
        }

        return this.result;
      },
      (err) => {
        this.isLoadingFinalScore = false;
        this.scoreError = true;
        if(err.status == 405){
          this.errorMessage = "API Doesn't respond: Internal server error";
        }else{
          this.errorMessage = err.statusText;
        }
      
        setTimeout(() => {
          this.scoreError = false;
          if (!this.trainModelError) this.errorMessage = null;
        }, 3000);
        console.log("HTTP Error", err);
      }
    );
    // this.scoreService.graph(graph).subscribe(graphResponse => {
    //   console.log(graphResponse);
    // });
    this.getGraphs(graph);
  }
  trainModel(): void {
    this.isLoadingTrainModel = true;

    this.scoreService.train().subscribe(
      (trainResponse) => {
        this.isLoadingTrainModel = false;
        this.trainModelSucces = true;
        console.log(trainResponse);

        setTimeout(() => {
          this.trainModelSucces = false;
        }, 3000);
      },
      (err) => {
        this.isLoadingTrainModel = false;
        this.trainModelError = true;
        if(err.status == 405){
          this.errorMessage = "API Doesn't respond: Internal server error";
        }else{
          this.errorMessage = err.statusText;
        }

        setTimeout(() => {
          this.trainModelError = false;
          if (!this.scoreError) this.errorMessage = null;
        }, 3000);
        console.log("HTTP Error", err);
      }
    );
    //this.getGraphs(gra);
  }
  getGraphs(graph: Graph) {
    this.scoreService.graph(graph).subscribe(graphResponse => {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + graphResponse.ImageBytes);
    setChart(graphResponse.meanGraph)
    });
  }
} 

function setChart(data: any) {
  new Chart(document.getElementById("myChart"), {
      type: 'bar',
      data: {
        labels: data['arr1'],
        datasets: [
          {
            label: "Example",
            backgroundColor: "#3e95cd",
            data: data['arr1']
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
  });
}
