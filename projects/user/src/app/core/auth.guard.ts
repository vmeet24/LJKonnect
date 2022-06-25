import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../core/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          // console.log("out");
          if (user.emailVerified) {
            // console.log("work");
            this.router.navigate(['/homepage']);
            return resolve(false);
          }
          else {
            // console.log("123");
            this.afAuth.auth.signOut();
            return resolve(true)
          }
        }, err => {
          // console.log("gigi");
          return resolve(true);
        })
    })
  }
}
