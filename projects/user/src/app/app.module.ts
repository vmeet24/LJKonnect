import { CookieService } from 'ngx-cookie-service';
import { EventResolver } from './event-detail/event.resolver';
import { AuthService } from './core/auth.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { HttpClientModule } from '@angular/common/http';

//material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule, MatCardModule, MatButtonModule, MatListModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar';
//firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "src/environments/environment";
import { QRCodeModule } from 'angularx-qrcode';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthGuard } from './core/auth.guard';
import { UserService } from './core/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './register-form/register-form.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UserResolver } from './myprofile/user.resolver';
import { MyeventsComponent } from './myevents/myevents.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoggedGuard } from './core/logged.guard';
import { FormResolver } from './register-form/form.resolver';
import { SubeventsResolver } from './register-form/subevents.resolver';
import { HomepageResolver } from './homepage/homepage.resolver';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { MyEventsResolver } from './myevents/myevents.resolver';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyEventsDetailsResolver } from './myevents/myeventsdetails.resolver';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { EditRegisterFormComponent } from './edit-register-form/edit-register-form.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

const providers = [{
  provide: HAMMER_GESTURE_CONFIG,
  useClass: MyHammerConfig
}, Title, AuthService, AuthGuard, MyEventsDetailsResolver,SubeventsResolver, HomepageResolver, MyEventsResolver, UserService, FormResolver, EventResolver, CookieService, UserResolver, LoggedGuard]


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.wanderingCubes, // foreground spinner type
  fgsColor: 'white',
  blur: 50,
  fgsPosition: "center-center",
  fgsSize: 60,
  text: "Connecting You..",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 100,
  pbColor: 'white',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5,
  overlayColor: 'rgba(38, 38, 106, 1)' // progress bar thickness
};

export const firebaseConfig = {
  apiKey: "AIzaSyByIuTCI4NbEbrHZ-4op4Jco1TG0bLmlMc",
  authDomain: "ljkonnect-bb276.firebaseapp.com",
  databaseURL: "https://ljkonnect-bb276.firebaseio.com",
  projectId: "ljkonnect-bb276",
  storageBucket: "ljkonnect-bb276.appspot.com",
  messagingSenderId: "1085290064076",
  appId: "1:1085290064076:web:162ae1cb8769817070ba69",
  measurementId: "G-W9VH73N1RP"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    EventDetailComponent,
    RegisterFormComponent,
    MyprofileComponent,
    MyeventsComponent,
    SideNavBarComponent,
    UserDetailComponent,
    AboutUsComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    DialogComponentComponent,
    EditRegisterFormComponent,
  ],
  entryComponents: [
    DialogComponentComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
    FormsModule,
    SidebarModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class UserSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}