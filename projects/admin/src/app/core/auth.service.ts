import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }


doLogin(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(value.login_id, value.password)
    .then(res => {
      resolve(res);
    }, err => reject(err))
  })
}


doLogout(){
  return new Promise((resolve, reject) => {
    if(firebase.auth().currentUser){
      let data = JSON.parse(localStorage.getItem('formvalue'));

      if (data) {
        localStorage.clear();
      }
      this.afAuth.auth.signOut();
      resolve();
    }
    else{
      reject();
    }
  });
}

}