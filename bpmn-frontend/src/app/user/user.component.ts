import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../model/user';
import { NotificationService } from '../service/notification.service';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Role } from '../enum/role.enum';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy {

  userForm!: FormGroup
  private subscriptions : Subscription [] =[];
  private titleSubject = new BehaviorSubject <string>('Users') ;
  public titleAction$ = this.titleSubject.asObservable();
  public users :User[] =[] ;
  public selectedUser: User = new User;
  public user: User = new User ;
  public refreshing : boolean= false ;
  public fileName: any =null;
  public profileImage: any = null;
  public editUser= new User();
  private currentUsername : string ='';

  p: number = 1;
  itemsPerPage : number = 6;
  totalElements: any ;



  constructor(  private router : Router , private userService : UserService  , private fb: FormBuilder,
     private authenticationService :AuthenticationService ,
              private notificationService : NotificationService ){}

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




  public searchUsers (searchTerm : string) : void {
    const results : User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()){
      if ( user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ) {
            results.push(user) ;
      }
    }
    this.users = results ;
    if (results.length === 0 || !searchTerm){
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  public onProfileImageChange (fileName : string , profileImage : File ) : void {
    this.fileName = fileName ;
    this.profileImage = profileImage ;
  }


  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo'); // button id = (openUserInfo) data-target = #viewUserModal
  }

  public saveNewUser () : void { // open newUserModal
    this.clickButton('new-user-save');
  }
  public onRegister(user: User) {
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User | HttpErrorResponse | HttpResponse<User>) => {

          if (response instanceof User){
          this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.
          please check your email for password to log in .`);

                this.router.navigateByUrl('/login');
        }
        },
        (errorResponse: HttpErrorResponse  ) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message );
          }
      )
    );
  }

  public onAddNewUser(userForm: NgForm): void {
    console.log(userForm.value);
    
    const formData = this.userService.createUserFormDate('', userForm.value, this.profileImage);
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(
        (response: User ) => {
          this.clickButton('new-user-close');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} added successfully`);
  },
  (errorResponse: HttpErrorResponse) => {
    this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
    this.profileImage = null;
  }
  )
    );
  }


  public onEditUser (editUser :User):void{
    this.editUser = editUser ;
    this.currentUsername = editUser.username ;
    this.clickButton('openUserEdit') ;
  }


  public onUpdateUser(): void {
    const formData = this.userService.createUserFormDate(this.currentUsername, this.editUser, this.profileImage);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User ) => {
            this.clickButton('edit-user-close');
            this.getUsers(false);
            this.fileName =null;
            this.profileImage = null;
            this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`);

        },(errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
          this.profileImage = null ;
         }
       )
       );
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









   public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been logged out successfully `)
   }

   public onDeleteUser(username: string): void {
    this.subscriptions.push(
      this.userService.deleteUser(username).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(false);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
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
  private clickButton(buttonId: string): void {
    const button = document.getElementById(buttonId);
    if (button) {
      button.click();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  initForm(){
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      role: ["", Validators.required],
      category: ["", Validators.required],
      profileImageUrl: ["", Validators.required],

    })
  }

}
