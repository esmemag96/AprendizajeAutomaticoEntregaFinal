import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private getProfessorURL = environment.getProfessor;

  constructor(private http: HttpClient) { }

  getProfessor(professorID:string): Observable<any>{
    let getProfessorBody = {
      idProfessor: professorID
    }
    return this.http.post(this.getProfessorURL, getProfessorBody)
  }
}
