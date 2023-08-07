import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import { environment}from '../../environments/environment';
import { Observable } from 'rxjs';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private host = environment.apiUrl;

  constructor (private http: HttpClient) {}

  public getPatients(): Observable<Patient[] | HttpErrorResponse> {
    return this.http.get<Patient[]>(`${this.host}/patient/list`);
  }
  public getTotalPatient(): Observable<number> {
    return this.http.get<number>(`${this.host}/patient/count`);
  }
  public getNumberOfWomen(): Observable<number> {
    return this.http.get<number>(`${this.host}/patient/count/woman`);
  }
  public getNumberOfMen(): Observable<number> {
    return this.http.get<number>(`${this.host}/patient/count/men`);
  }
  public getNumberOfGirls(): Observable<number> {
    return this.http.get<number>(`${this.host}/patient/count/girls`);
  }
  public getNumberOfBoys(): Observable<number> {
    return this.http.get<number>(`${this.host}/patient/count/boys`);
  }
  

  public addPatient(formData: FormData): Observable<Patient> {
    return this.http.post<Patient>(`${this.host}/patient/add`,formData);
  }

  public updatePatient(formData: FormData): Observable<Patient> {
    return this.http.post<Patient>(`${this.host}/patient/update`,formData);
  }



  public updateProfilImage(formData: FormData): Observable<HttpEvent<Patient> | HttpErrorResponse> {
    return this.http.post<Patient>(`${this.host}/patient/updateProfileImage` , formData,
     {
      reportProgress:true,
      observe: 'events'
     })
    ;
  }

  public deletePatient(id: string): Observable<CustomHttpRespone>{
    return this.http.delete<CustomHttpRespone>(`${this.host}/patient/delete/${id}`);

  }
  public addPatientsToLocalCache(patients: Patient[]): void {
    localStorage.setItem('patients', JSON.stringify(patients));
  }

  public getPatientsFromLocalCache() : Patient[] {
    if (localStorage.getItem('patients')){
    return JSON.parse(localStorage.getItem('patients') || '') ;
   }
   return [];
  }

  public createPatientFormDate( patient:Patient, profileImage:File): FormData {
   const formData = new FormData();
   formData.append('adresse', patient.adresse);
   formData.append('genre', patient.genre);
   formData.append('tel', patient.tel);
   formData.append('firstName',patient.firstName);
   formData.append('lastName', patient.lastName);
   formData.append('birthDate', patient.birthDate);
   formData.append('patientId', patient.patientId);
   formData.append('profileImage', profileImage);
   return formData;
  }
}
