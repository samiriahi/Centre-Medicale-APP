import { Component } from '@angular/core';
import { Role } from '../enum/role.enum';
import { NotificationService } from '../service/notification.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(  private router : Router ,private authenticationService :AuthenticationService ,
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
}
