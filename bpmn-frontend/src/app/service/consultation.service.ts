import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  addNewConsultation(consultation: any): Observable<any>{
    return this.http.post<any>(`${this.host}/addConsultation`, consultation)
  }

  getAllConsultation(): Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/getAllConsultation`)
  }

  getConsultationById(id: number): Observable<any>{
    return this.http.get<any>(`${this.host}/consultationById/${id}`);
  }
}
