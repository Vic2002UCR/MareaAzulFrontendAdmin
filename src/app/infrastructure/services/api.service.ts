import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TestResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getTest(): Observable<TestResponse> {
    return this.http.get<TestResponse>(`${this.baseUrl}/test`);
  }
}