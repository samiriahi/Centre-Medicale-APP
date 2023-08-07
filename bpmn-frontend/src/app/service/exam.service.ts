import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllExams(): Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/api/v1/MedExam`)
  }
}
