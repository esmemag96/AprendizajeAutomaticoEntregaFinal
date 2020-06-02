import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { ProfessorService } from "../../services/professor.service";
import { Professor } from "../../model/Professor";
import { Ecoa } from "../../model/Ecoa";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  professor: Professor;
  actualClass: number;
  ecoas: Array<any>;

  searchForm: FormGroup;
  // Handle Loading
  loadingProfessor: boolean;
  loadingEcoa: boolean;
  // Handle Error
  professorError:boolean;
  ecoaError:boolean;

  constructor(
    private ecoaService: EcoaService,
    private professorService:ProfessorService,
    private formBuilder: FormBuilder
  ) {
    this.actualClass = null
    this.loadingProfessor = false;
    this.loadingEcoa = false;

    this.professorError=false;
    this.ecoaError=false;
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
        console.log(this.professor);
        this.getEcoa();
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
  
}
