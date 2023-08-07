import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../enum/role.enum';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {

  private currentUsername : string ='';
  public refreshing : boolean= false ;
  private subscriptions : Subscription [] =[];
  public fileName: any =null;
  public profileImage: any = null;
  totalElements: any ;
  public users :User[] =[] ;
  private titleSubject = new BehaviorSubject <string>('Users') ;
  public titleAction$ = this.titleSubject.asObservable();
  public user: User = new User ;


  constructor(  private router : Router , private userService : UserService  ,
    private authenticationService :AuthenticationService ,
             private notificationService : NotificationService ){}




   ngOnInit(): void {
    this.user=this.authenticationService.getUserFromLocalCache();
    this.getUsers(true) ;
    }


     public changeTitle(title :string) :void {
     this.titleSubject.next(title);
      }









  onUpdateCurrentUser(user: User) : void {
    this.refreshing=true;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserFormDate(this.currentUsername, user, this.profileImage);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User ) => {
          this.authenticationService.addUserToLocalCache(response);
            this.getUsers(false);
            this.fileName =null;
            this.profileImage = null;
            this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`);

        },(errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
          this.refreshing=true;
          this.profileImage = null ;
         }
       )
       );
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



  private sendNotification(notificationType: NotificationType, message: string) :void{
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
