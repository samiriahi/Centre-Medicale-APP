import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private host = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/api/v1/Room`);    
  }

  addNewRoom(room: any):Observable<any>{
    return this.http.post<any>(`${this.host}/api/v1/newRoom`, room)
  }
}
