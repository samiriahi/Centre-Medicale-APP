import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit , OnDestroy{
  public showLoading: boolean | undefined;
  private subscriptions: Subscription[]= [];

  constructor(private router: Router,private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

ngOnInit(): void {
  if(this.authenticationService.isUserLoggedIn()){
    this.router.navigateByUrl('/user/management');

  }
}
public onRegister(user: User):void {
  this.showLoading= true;
  this.subscriptions.push(
    this.authenticationService.register(user).subscribe(
      (response: User ) => {
        this.showLoading = false;
        this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.Please check your email for password to log in.`);
      },
      (errorResponse : HttpErrorResponse) => {
        console.log(errorResponse);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.showLoading = false ;
      }
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



ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

}
