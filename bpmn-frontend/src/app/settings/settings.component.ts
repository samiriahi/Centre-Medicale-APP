import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomHttpRespone } from '../model/custom-http-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type';
import { NotificationService } from '../service/notification.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit,OnDestroy {

  private titleSubject = new BehaviorSubject <string>('Users') ;
  public titleAction$ = this.titleSubject.asObservable();
  public refreshing : boolean= false ;
  private subscriptions : Subscription [] =[];
  public user: User = new User ;
  public users :User[] =[] ;

  totalElements: any ;
  public fileName: any =null;
  public profileImage: any = null;

  constructor(  private notificationService : NotificationService,private authenticationService :AuthenticationService  ,  private userService : UserService  ){}

  ngOnInit(): void {
    this.user=this.authenticationService.getUserFromLocalCache();
    this.getUsers(true) ;
  }


  


 public changeTitle(title :string) :void {
  this.titleSubject.next(title);
}

 public getUsers(showNotification: boolean): void {
  this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUsers().subscribe(
      (response: any) => {
        const users = response as User[];
        this.userService.addUsersToLocalCache(users);
        this.users = users;
        this.refreshing = false;
        this.totalElements = users.length;
        if (showNotification) {
          this.sendNotification(NotificationType.SUCCESS, `${users.length} user(s) loaded successfully.`);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      }
    )
  );
}
 ///seeting
 public onResetPassword(emailForm: NgForm):void {
  this.refreshing = true;
  const emailAddress = emailForm.value['reset-password-email'];
  this.subscriptions.push(
    this.userService.resetPassword(emailAddress).subscribe(
      (response : CustomHttpRespone) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.refreshing = false;
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.WARNING, error.error.message);
        this.refreshing = false;
      },
      () => emailForm.reset()
    )
  );
 }

 private sendNotification(notificationType: NotificationType, message: string) :void{
  if(message){
    this.notificationService.notify(notificationType,message) ;
  } else {
    this.notificationService.notify(notificationType, 'An error occure . please try again ');
  }
 }

 public get isAdmin(): boolean {
  return this.getUserRole() === Role.ADMIN ||  this.getUserRole() === Role.SUPER_ADMIN;  ;
 }

 public get isManager(): boolean {
  return this.isAdmin||  this.getUserRole() === Role.MANAGER;
 }

 public get isAdminOrManager():boolean {
  return this.isAdmin || this.isManager;
 }


 private getUserRole():string {
  return this.authenticationService.getUserFromLocalCache().role;
}
private clickButton(buttonId: string): void {
  const button = document.getElementById(buttonId);
  if (button) {
    button.click();
  }
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub=>sub.unsubscribe());
}
}
