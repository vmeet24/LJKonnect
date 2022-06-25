import { MyEventsResolver } from './myevents/myevents.resolver';
import { LoggedGuard } from './core/logged.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { AuthGuard } from './core/auth.guard';
import { EventResolver } from './event-detail/event.resolver';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserResolver } from './myprofile/user.resolver';
import { MyeventsComponent } from "./myevents/myevents.component";
import { FormResolver } from './register-form/form.resolver';
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SubeventsResolver } from './register-form/subevents.resolver';
import { HomepageResolver } from './homepage/homepage.resolver';
import { EditRegisterFormComponent } from "./edit-register-form/edit-register-form.component";
import { MyEventsDetailsResolver } from './myevents/myeventsdetails.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [LoggedGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [LoggedGuard] },
  { path: 'homepage', component: HomepageComponent, resolve: { post: HomepageResolver }, canActivate: [LoggedGuard], data: { page: 'homepage' } },
  { path: 'event-detail/:id', component: EventDetailComponent, resolve: { post: EventResolver, event: SubeventsResolver }, canActivate: [LoggedGuard], data: { page: 'event-detail' } },
  { path: 'myprofile', component: MyprofileComponent, resolve: { user: UserResolver }, canActivate: [LoggedGuard], data: { page: 'myprofile' } },
  { path: 'registerform/:id', component: RegisterFormComponent, resolve: { subevent: SubeventsResolver, form: FormResolver, event: EventResolver }, canActivate: [LoggedGuard], data: { page: 'registerform' } },
  { path: 'editregisterform/:id', component: EditRegisterFormComponent, resolve: { subevent: SubeventsResolver, form: FormResolver, event: EventResolver }, canActivate: [LoggedGuard], data: { page: 'editregisterform' } },
  { path: 'myevents', component: MyeventsComponent, resolve: { user: MyEventsResolver,detail : MyEventsDetailsResolver }, canActivate: [LoggedGuard], data: { page: 'myevents' } },
  // { path: '**', component: PageNotFoundComponent },
  // { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
