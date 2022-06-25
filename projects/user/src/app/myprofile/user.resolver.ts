import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from '../core/user.service';
import { Observable } from 'rxjs';



@Injectable()
export class UserResolver implements Resolve<any> {
  user
  constructor(public userService: UserService,
    private firestore: AngularFirestore,
  ) { }
  private id: string
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | any {

    return new Promise<any>((resolve, reject) => {
      this.userService.getCurrentUser().then((user) => {
        
        (this.firestore.collection("Users", ref => ref.where("Email", "==", user.email)).get().subscribe((docSnapshot) => {
          if (docSnapshot.empty) {
          }
          else {
            resolve(docSnapshot.docs)
          }
        }));
      });
    })
  }
}



