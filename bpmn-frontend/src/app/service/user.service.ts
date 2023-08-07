import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import { environment}from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor (private http: HttpClient) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`,formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`,formData);
  }

  public resetPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfilImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage` , formData,
     {
      reportProgress:true,
      observe: 'events'
     })
    ;
  }

  public deleteUser(username: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/user/delete/${username}`);

  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache() : User[] {
    if (localStorage.getItem('users')){
    return JSON.parse(localStorage.getItem('users') || '') ;
   }
   return [];
  }

  public createUserFormDate(loggedInUsername:string, user:User, profileImage:File): FormData {
   const formData = new FormData();
   formData.append('currentUsername', loggedInUsername);
   formData.append('firstName',user.firstName);
   formData.append('lastName', user.lastName);
   formData.append('username', user.username);
   formData.append('email', user.email);
   formData.append('role', user.role);
   formData.append('profileImage', profileImage);
   formData.append('isActive', JSON.stringify(user.active));
   formData.append('isNotLocked', JSON.stringify(user.notLocked));
   formData.append('category', user.category);

   return formData;
  }
}
