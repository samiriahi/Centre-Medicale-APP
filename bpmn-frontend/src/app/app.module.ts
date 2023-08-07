import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationService } from './service/notification.service';
import { NotificationModule } from './notification.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { PatientComponent } from './patient/patient.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilComponent } from './profil/profil.component';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientByAgeComponent } from './patient-by-age/patient-by-age.component';
import { PatientByGenreComponent } from './patient-by-genre/patient-by-genre.component';
import { LastFewPatientComponent } from './last-few-patient/last-few-patient.component';
import { NgChartsModule  } from 'ng2-charts';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SideNavComponent,
    HeaderComponent,
    MainComponent,
    PatientComponent,
    SettingsComponent,
    LogoutComponent,
    ProfilComponent,
    TopWidgetsComponent,
    DashboardComponent,
    PatientByAgeComponent,
    PatientByGenreComponent,
    LastFewPatientComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule,
    NgChartsModule,
    FullCalendarModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    BrowserAnimationsModule,
    InputTextModule
  ],
  providers: [AuthenticationService , UserService , NotificationService,AuthenticationGuard,
    { provide :HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi :true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
