import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSharedModule } from 'projects/user/src/app/app.module';
import { AdminSharedModule } from 'projects/admin/src/app/app.module';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UnderConstructionComponent } from './under-construction/under-construction.component';


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
    UnderConstructionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    UserSharedModule.forRoot(),
    AdminSharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
