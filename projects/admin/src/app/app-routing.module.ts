import { NgModule, Injectable } from '@angular/core';
import { LoginComponent } from "./login/login.component"
import { HomepageComponent } from "./homepage/homepage.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { AddEventComponent } from './add-event/add-event.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EventupdateComponent } from './eventupdate/eventupdate.component';
import { ConfirmRegistrationComponent } from "./confirm-registration/confirm-registration.component";
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { EventResolver } from './eventdetails/event.resolver';
import { RegisterResolver } from './show-registered-user/reguser.resolver'
import { ShowRegisteredUserComponent } from "./show-registered-user/show-registered-user.component";
import { homepageResolver } from "./homepage/homepage.resolver";
import {
  Routes,
  RouterModule
} from "@angular/router";
import { AuthGuard } from './core/auth.guard';
import { MyprofileResolver } from './myprofile/myprofile.resolver';
import { SubEventFormComponent } from './sub-event-form/sub-event-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SubeventupdateResolver } from './subeventupdate/subeventupdate.resolver';
import { SubeventupdateComponent } from './subeventupdate/subeventupdate.component';
import { LoggedGuard } from './core/logged.guard';


const routes: Routes = [
  { path: 'admin/homepage', component: HomepageComponent, resolve: { post: homepageResolver }, canActivate: [LoggedGuard] },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'admin/add-event', component: AddEventComponent, canActivate: [LoggedGuard] },
  { path: 'admin/add-admin', component: AddAdminComponent, canActivate: [LoggedGuard] },
  { path: 'admin/myprofile', component: MyprofileComponent, resolve: { data: MyprofileResolver }, canActivate: [LoggedGuard] },
  { path: 'admin/event-detail/:id', component: EventdetailsComponent, resolve: { post: EventResolver } },
  { path: 'admin/event-update/:id', component: EventupdateComponent, resolve: { post: EventResolver } },
  { path: 'admin/sub-event/:id', component: SubEventFormComponent },
  { path: 'admin/register-users/:id', component: ShowRegisteredUserComponent, resolve: { post: RegisterResolver } },
  { path: 'admin/add-event/event-form/:id', component: DynamicFormComponent },
  { path: 'admin/confirm-registration/:id', component: ConfirmRegistrationComponent },
  { path: 'admin/sub-event-update/:id1/:id2', component: SubeventupdateComponent, resolve: { subevent: SubeventupdateResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
