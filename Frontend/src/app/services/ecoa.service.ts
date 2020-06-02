import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ecoa } from '../model/Ecoa';
import { User } from '../model/User';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EcoaService {

    private getStudent = environment.getStudentEndpoint;
    private createEcoa = environment.createEcoaEndpoint;
    private logStudent = environment.loginStudentEndpoint;
    private logAdmin = environment.loginAdminEndpoint;
    private getEcoaURL = environment.getEcoasbyIdProfesor;

    constructor(private http: HttpClient) {
    }

    loginStudent(User: User): Observable<any> {

        const getStudentRequest = {
            idStudent: User.user,
            password: User.password
        };
        return this.http.post(this.logStudent, getStudentRequest)

    }
    loginAdmin(User: User): Observable<any> {

        const getStudentRequest = {
            idProfessor: User.user,
            password: User.password
        };
        return this.http.post(this.logAdmin, getStudentRequest)

    }
    student(student: string): Observable<any> {

        const getStudentRequest = {
            idStudent: student,
        };
        return this.http.post(this.getStudent, getStudentRequest)

    }

    ecoa(Ecoa: Ecoa): Observable<any> {

        const createEcoaRequest = {
            questions: Ecoa.questions,
            idStudent: Ecoa.idStudent,
            idProfessor: Ecoa.idProfessor,
            idClass: Ecoa.idClass
        };
        return this.http.post(this.createEcoa, createEcoaRequest)

    }

    getEcoa(idProfessor: string, idClass:string): Observable<any>{
        let GetEcoasbyIdProfesorBody = {
            idProfessor: idProfessor,
            idClass: idClass
        }

        return this.http.post(this.getEcoaURL, GetEcoasbyIdProfesorBody);
    }
}