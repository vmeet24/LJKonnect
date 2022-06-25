import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSharedModule } from 'projects/user/src/app/app.module';
import { AdminSharedModule } from 'projects/admin/src/app/app.module';
import { UnderConstructionComponent } from "./under-construction/under-construction.component";
import { PageNotFoundComponent } from "../../projects/user/src/app/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'under', component: UnderConstructionComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', loadChildren: '../../projects/user/src/app/app.module#UserSharedModule' },
  { path: 'admin', loadChildren: '../../projects/admin/src/app/app.module#AdminSharedModule' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserSharedModule.forRoot(), AdminSharedModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
