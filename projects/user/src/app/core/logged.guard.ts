import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';


@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        if(!user.emailVerified)
        {
          this.router.navigate(['/']);
        return resolve(false);
        }
        else
        {
          return resolve(true)
        }
        
      }, err => {
        console.error("error");
        this.router.navigate(['/']);
        return resolve(false);
      })
    })
  }
}
