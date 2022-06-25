import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminService } from '../core/admin.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public adminService: AdminService,
    private router: Router,
    private db: AngularFirestore
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.adminService.getCurrentAdmin()
        .then(admin => {
          return admin
        }).then(admin => {
          let id = admin.email.substring(0, admin.email.lastIndexOf("@"))
          this.db.collection("Admins").doc(id).get().subscribe(res => {
            if (res.exists) {
              this.router.navigate(['/admin/homepage']);
              return resolve(false)
            }
            else {
              return resolve(true)
            }
          })
        }).catch(err => {
          return resolve(true)
        })
    })
  }
}