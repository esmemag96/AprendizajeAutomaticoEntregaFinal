import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { ScoreService } from "../../services/score.service";
import { ProfessorService } from "../../services/professor.service";
import { Professor } from "../../model/Professor";
import { Score } from "../../model/Score";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  professor: Professor;
  actualClass: number;
  ecoas: Array<any>;
  score: Score;
  finalScore: number;

  searchForm: FormGroup;
  // Handle Loading
  loadingProfessor: boolean;
  loadingEcoa: boolean;
  loadingPredictions:boolean;
  // Handle Error
  professorError:boolean;
  ecoaError:boolean;
  predictionsError:boolean;

  predictionColor: string;

  constructor(
    private ecoaService: EcoaService,
    private professorService:ProfessorService,
    private scoreService: ScoreService,
    private formBuilder: FormBuilder
  ) {
    this.actualClass = null
    this.loadingProfessor = false;
    this.loadingEcoa = false;
    this.loadingPredictions = false;

    this.professorError=false;
    this.ecoaError=false;
    this.predictionsError=false;
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      id: ["", Validators.required],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  getProfessor(): void {
    let id = this.f.id.value;
    if(this.professor){
      if(id == this.professor.idProfessor)      return;
    }

    this.loadingProfessor = true;
    
    this.professorService.getProfessor(id).subscribe(
      (response) => {
        this.loadingProfessor = false;
        //console.log(response);
        this.professor = {
          _id: response._id,
          classes: response.classes, 
          idProfessor: response.idProfessor, 
          name: response.name,
          Ecoa1: response.Ecoa1,
          Ecoa2: response.Ecoa2
        }

        this.actualClass = 0

        this.score = {
          TeacherID: response.idProfessor,
          ClassID: response.classes[this.actualClass].classCode,
          grade1: response.Ecoa1 , 
          grade2: response.Ecoa2
        }

        this.getEcoa();
        this.getPrediction(this.score);

        console.log(this.professor);
      },
      (err) => {
        this.loadingProfessor = false;
        this.professorError = true;
        this.professor = null;
        console.log("HTTP Error", err);
      }
    );
  }

  
  getEcoa(): void{
    if(this.professor){
      if(this.professor.classes.length > 0){
        this.loadingEcoa = true;
        this.ecoaService.getEcoa(this.professor._id, this.professor.classes[this.actualClass]._id).subscribe(
          (response) => {
            this.loadingEcoa = false;
            //console.log(response);
            this.ecoas = response;
            console.log(this.ecoas);
          },
          (err) => {
            this.loadingEcoa = false;
            this.ecoaError = true;
            //this.ecoa = null;
            console.log("HTTP Error", err);
          }
        );
        
      }
    }
  }

  changeEcoa(cahngeN): void{
    if(this.actualClass+cahngeN >= this.professor.classes.length || this.actualClass+cahngeN < 0) return;
    this.actualClass += cahngeN;
    this.ecoas = null;
    this.getEcoa();
  }

  getPrediction(score:Score): void{
    this.loadingPredictions = true;

    this.scoreService.score(score).subscribe(
      (response) => {
        this.loadingPredictions = false;
        console.log(response);
        this.finalScore = response.predictionResult;
        this.finalScore = Math.round(Number(this.finalScore) * 100)/100;

        if(this.finalScore >= 70){
          this.predictionColor = "rgb(51, 153, 22)";
        }else if(this.finalScore < 70 && this.finalScore >= 40){
          this.predictionColor = "rgb(254, 166, 2)";
        }else{
          this.predictionColor = "rgb(226, 27, 60)";
        }
      },
      (err) => {
        this.loadingPredictions = false;
        this.predictionsError = true;
        //this.ecoa = null;
        console.log("HTTP Error", err);
      }
    );
  }
  
}
