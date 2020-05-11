import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Score } from '../model/Score';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScoreService  {

  private predictUrl = environment.scoreApiEndpoint;  // URL to web api

  constructor(private http: HttpClient) {
  }

  score(score: Score): Observable<any> {
    // this.messageService.add('Login.....');

    const predictRequest = {
                          TeacherID: score.TeacherID,
                          grade1: score.grade1,
                          grade2: score.grade2
                        };
    return this.http.post(this.predictUrl, predictRequest)
             
  }
}