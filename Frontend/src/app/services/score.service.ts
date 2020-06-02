import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Score } from '../model/Score';
import { Graph } from '../model/Graph';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScoreService {

  private predictUrl = environment.scoreApiEndpoint;
  private trainUrl = environment.trainApiEndpoint;
  private graphUrl = environment.graphApiEndpoint;

  constructor(private http: HttpClient) {
  }

  score(score: Score): Observable<any> {
    const predString = "TeacherID=" + score.TeacherID + "&ClassID="+ score.ClassID +"&grade1="+score.grade1+"&grade2="+score.grade2
    const opts = { params: new HttpParams({fromString: predString}) };
    console.log(opts)
    return this.http.get(this.predictUrl, opts)
  }

  train(): Observable<any> {
    const trainRequest = {
      train: true
    };
    return this.http.post(this.trainUrl, trainRequest)
  }

  graph(graph: Graph): Observable<any> {
    const graphRequest = {
      getGraphs: graph.getGraphs,
      teacherID: graph.teacherID,
    };
    return this.http.post(this.graphUrl, graphRequest)
  }
}