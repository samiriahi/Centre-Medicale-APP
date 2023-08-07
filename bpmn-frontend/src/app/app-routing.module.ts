import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
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
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate:[AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'side-nav', component: SideNavComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'main', component: MainComponent},
  {path: 'patient', component: PatientComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'profil', component:ProfilComponent},
  {path: 'topwidgetscomponenet',component :TopWidgetsComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'patientbyage', component:PatientByAgeComponent},
  {path:'patientbygenre', component:PatientByGenreComponent},
  {path:'fewpatient', component:LastFewPatientComponent},
  {path:'calendar', component:CalendarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
