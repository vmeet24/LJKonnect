import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AdmindataService } from '../core/admindata.service';
import { AdminDataModel } from '../core/addmindata.model';

@Injectable()
export class MyprofileResolver implements Resolve<AdminDataModel> {

  constructor(public admindataService: AdmindataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<AdminDataModel> {

    let admin = new AdminDataModel();

    return new Promise((resolve, reject) => {
      this.admindataService.getAdmindata()
        .then(res => {
          admin.login_id = res.Login_ID;
          admin.parent_id = res.Parent_ID;
          admin.phone = res.Phone_Number;
          admin.added_events = res.Added_Events;

          return resolve(admin);
        }, err => {
          this.router.navigate(['/admin/login']);
          return reject(err);
        })
    })
  }
}