import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type';
import { HeaderType } from '../enum/header-type-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {

  private subscriptions : Subscription [] =[];
  public showLoading : boolean = false ;

  constructor(  private notificationService :NotificationService , private router : Router ,
                private authenticationService :AuthenticationService) {}

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/user/management') ;
    }else{
      this.router.navigateByUrl('/login') ;
    }
  }

  public onLogin (user : User){
    this.subscriptions.push (
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
            const token = response.headers.get(HeaderType.JWT_TOKEN);
            if (token !== null) {
              this.authenticationService.saveToken(token);
            }
            const user = response.body;
            if (user !== null) {
              this.authenticationService.addUserToLocalCache(response.body);
              //this.router.navigateByUrl('/user/management');
              this.router.navigateByUrl('/main');
            }

          /* else if (response instanceof HttpErrorResponse) {
            this.sendErrorNotification(NotificationType.ERROR, response.error.message);
          }*/
        }
      },
          (errorResponse: HttpErrorResponse) => {
            this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          }
      )
      );
  }


  private sendErrorNotification(notificationType: NotificationType, message: string) :void{
    if(message){
      this.notificationService.notify(notificationType,message) ;
    } else {
      this.notificationService.notify(notificationType, 'An error occure . please try again ');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


}
