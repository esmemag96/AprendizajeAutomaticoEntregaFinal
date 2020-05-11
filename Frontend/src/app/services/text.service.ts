import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Text } from '../model/Text';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })

export class TextService {

  private textUrl = environment.textApiEndpoint;

  constructor(private http: HttpClient) {
  }

  text(text: Text): Observable<any> {
    // this.messageService.add('Login.....');

    const predictRequest = {
        inputText: text.inputText
    };
    return this.http.post(this.textUrl, predictRequest)

  }
}