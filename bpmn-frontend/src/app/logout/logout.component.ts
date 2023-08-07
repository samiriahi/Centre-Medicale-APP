import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent   {


  constructor(  private router : Router ,
    private authenticationService :AuthenticationService ,
    private notificationService : NotificationService
              ){}



  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    this.sendNotification(NotificationType.SUCCESS, `You've been logged out successfully `)
   }


   private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
      this.notificationService.notify(notificationType,message) ;
    } else {
      this.notificationService.notify(notificationType, 'An error occure . please try again ');
    }
  }
}
