import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Score } from '../model/Score';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScoreService {

  private predictUrl = environment.scoreApiEndpoint;
  private trainUrl = environment.trainApiEndpoint;

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

  train(): Observable<any> {
    // this.messageService.add('Login.....');

    const trainRequest = {
      train: true
    };
    return this.http.post(this.trainUrl, trainRequest)

  }
}