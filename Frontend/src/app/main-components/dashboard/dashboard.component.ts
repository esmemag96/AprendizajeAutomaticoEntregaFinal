import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { ProfessorService } from "../../services/professor.service";
import { Professor } from "../../model/Professor";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  professor: Professor;

  searchForm: FormGroup;
  // Handle Loading
  loadingProfessor: boolean;
  loadingEcoa: boolean;
  // Handle Error
  professorError:boolean;

  constructor(
    private ecoaService: EcoaService,
    private professorService:ProfessorService,
    private formBuilder: FormBuilder
  ) {
    this.loadingProfessor = false;
    this.loadingEcoa = false;

    this.professorError=false
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
          classes: response.classes, 
          idProfessor: response.idProfessor, 
          name: response.name,
          Ecoa1: response.Ecoa1,
          Ecoa2: response.Ecoa2
        }
        console.log(this.professor);
        return this.professor;
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
    this.loadingEcoa = true;

    
  }
  
}
