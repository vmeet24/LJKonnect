import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  admin;
  id;
  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ){
  this.afAuth.authState.subscribe(auth => {
    if (auth) {
      this.id=auth.uid;
    }});
 }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
   this.db.collection("Users").doc(this.id).update({...value})
  }

  getCurrentUserData()
  {
    return new Promise<any>((resolve,reject)=>{
      this.db.collection("Users").doc(this.id).get().subscribe(doc=>{
        resolve(doc.data())
      })
    })
  }

}
