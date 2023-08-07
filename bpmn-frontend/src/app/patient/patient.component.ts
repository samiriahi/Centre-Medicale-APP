import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type';
import { PatientService } from '../service/patient.service';
import { NotificationService } from '../service/notification.service';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Role } from '../enum/role.enum';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit ,OnDestroy{

  private subscriptions : Subscription [] =[];
  private titleSubject = new BehaviorSubject <string>('Patients') ;
  public titleAction$ = this.titleSubject.asObservable();
  public patients:Patient[] =[] ;
  public selectedPatient: Patient = new Patient;
  public patient: Patient = new Patient ;
  public refreshing : boolean= false ;
  public fileName: any =null;
  public profileImage: any = null;
  public editPatient= new Patient();
  private currentpatientId : string ='';

  p: number = 1;
  itemsPerPage : number = 6;
  totalElements: any ;



  constructor(  private router : Router , private patientServicee : PatientService  ,
     private authenticationService :AuthenticationService ,
    private notificationService : NotificationService ){}


    ngOnInit(): void {
      this.patient=this.authenticationService.getPatientFromLocalCache();
      this.getPatients(true) ;
    }



  public changeTitle(title :string) :void {
    this.titleSubject.next(title);
  }


  public getPatients(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.patientServicee.getPatients().subscribe(
        (response: any) => {
          const patients = response as Patient[];
          this.patientServicee.addPatientsToLocalCache(patients);
          this.patients = patients;
          this.refreshing = false;
          this.totalElements = patients.length;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${patients.length} patient(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }

  public searchPatients (searchTerm : string) : void {
    const results : Patient[] = [];
    for (const patient of this.patientServicee.getPatientsFromLocalCache()){
      if ( patient.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           patient.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           patient.adresse.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           patient.tel.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           patient.genre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           patient.patientId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ) {
            results.push(patient) ;
      }
    }
    this.patients = results ;
    if (results.length === 0 || !searchTerm){
      this.patients = this.patientServicee.getPatientsFromLocalCache();
    }
  }


  public onProfileImageChange (fileName : string , profileImage : File ) : void {
    this.fileName = fileName ;
    this.profileImage = profileImage ;
  }

  public onSelectPatient(selectedPatient: Patient): void {
    this.selectedPatient = selectedPatient;
    this.clickButton('openPatientInfo'); // button id = (openUserInfo) data-target = #viewUserModal
  }

  public saveNewPatient () : void { // open newUserModal
    this.clickButton('new-patient-save');
  }


  public onAddNewPatient(patientForm: NgForm): void {
    const formData = this.patientServicee.createPatientFormDate( patientForm.value, this.profileImage);
    this.subscriptions.push(
      this.patientServicee.addPatient(formData).subscribe(
        (response: Patient ) => {
          this.clickButton('new-patient-close');
          this.getPatients(false);
          this.fileName = null;
          this.profileImage = null;
          patientForm.reset();
          this.sendNotification(NotificationType.SUCCESS,`${response.firstName} ${response.lastName} added successfully`);
  },
  (errorResponse: HttpErrorResponse) => {
    this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
    this.profileImage = null;
  }
  )
    );
  }


  public onEditPatient (editPatient :Patient):void{
    this.editPatient = editPatient ;
    this.currentpatientId = editPatient.patientId ;
    this.clickButton('openPatientEdit') ;
  }


  public onUpdatePatient(): void {
    const formData = this.patientServicee.createPatientFormDate( this.editPatient, this.profileImage);
    this.subscriptions.push(
      this.patientServicee.updatePatient(formData).subscribe(
        (response: Patient ) => {
            this.clickButton('edit-patient-close');
            this.getPatients(false);
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




   onUpdateCurrentPatient(patient: Patient) : void {
    this.refreshing=true;
    this.currentpatientId = this.authenticationService.getPatientFromLocalCache().patientId;
    const formData = this.patientServicee.createPatientFormDate( patient, this.profileImage);
    this.subscriptions.push(
      this.patientServicee.updatePatient(formData).subscribe(
        (response: Patient ) => {
          this.authenticationService.addPatientToLocalCache(response);
            this.getPatients(false);
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





  public onDeletePatient(id: string): void {
    this.subscriptions.push(
      this.patientServicee.deletePatient(id).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getPatients(false);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
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

  private clickButton(buttonId: string): void {
    const button = document.getElementById(buttonId);
    if (button) {
      button.click();
    }
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
