import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AdminService } from './core/admin.service';
import { AdmindataService } from './core/admindata.service';
import { MyprofileResolver } from './myprofile/myprofile.resolver';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { EventResolver } from './eventdetails/event.resolver';
import { EventupdateComponent } from './eventupdate/eventupdate.component';
import { SubEventFormComponent } from './sub-event-form/sub-event-form.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AuthGuard } from './core/auth.guard';
import { RegisterResolver } from './show-registered-user/reguser.resolver';
import { LoggedGuard } from './core/logged.guard';


//material modules
import { CdkTableModule } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule, MatCardModule, MatButtonModule, MatListModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from "@angular/material";
import { MatSortModule } from "@angular/material";
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//firebase
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatTableModule } from '@angular/material/table';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SubeventupdateComponent } from './subeventupdate/subeventupdate.component';
import { SubeventupdateResolver } from './subeventupdate/subeventupdate.resolver';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderConfig, SPINNER, PB_DIRECTION, NgxUiLoaderModule } from 'ngx-ui-loader';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ShowRegisteredUserComponent } from './show-registered-user/show-registered-user.component';
import { homepageResolver } from "./homepage/homepage.resolver";

const providers = [AuthGuard, AdminService, homepageResolver, SubeventupdateResolver, AdmindataService, RegisterResolver, MyprofileResolver, EventResolver, LoggedGuard]
export const firebaseConfig = {
  apiKey: "AIzaSyByIuTCI4NbEbrHZ-4op4Jco1TG0bLmlMc",
  authDomain: "ljkonnect-bb276.firebaseapp.com",
  databaseURL: "https://ljkonnect-bb276.firebaseio.com",
  projectId: "ljkonnect-bb276",
  storageBucket: "ljkonnect-bb276.appspot.com",
  messagingSenderId: "1085290064076",
  appId: "1:1085290064076:web:7b70b1c811c5437970ba69",
  measurementId: "G-V4ZQT2CH35"
};

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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavBarComponent,
    AddEventComponent,
    AddAdminComponent,
    MyprofileComponent,
    EventdetailsComponent,
    EventupdateComponent,
    SubEventFormComponent,
    DynamicFormComponent,
    SubeventupdateComponent,
    DynamicDialogComponent,
    PageNotFoundComponent,
    ConfirmRegistrationComponent,
    ShowRegisteredUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    NgxMaterialTimepickerModule.setLocale('en-IN'),
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatTableModule,
    MatExpansionModule,
    MaterialFileInputModule,
    MatSlideToggleModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ImageCropperModule,
  ],
  entryComponents: [
    DynamicDialogComponent,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}