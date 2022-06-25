import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }


  getCurrentAdmin() {
    return new Promise<any>((resolve, reject) => {
      var admin = firebase.auth().onAuthStateChanged(function (admin) {
        if (admin) {
          resolve(admin);
        } else {
          reject('No admin logged in');
        }
      })
    })
  }


}