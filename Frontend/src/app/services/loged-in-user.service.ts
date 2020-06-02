import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loged } from '../model/Loged';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LogedInUserService {

    private getStudent = environment.getStudentEndpoint;

    constructor(private http: HttpClient) { }

    student(student: string): Observable<any> {

        const getStudentRequest = {
            idStudent: student,
        };
        return this.http.post(this.getStudent, getStudentRequest)

    }

    setUser(user: Loged) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    getCurrentUser(): Loged {
        const user: Loged = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}