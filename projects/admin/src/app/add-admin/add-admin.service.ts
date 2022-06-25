import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AddAdmin } from './add-admin';
import { firebaseConfig } from '../app.module';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AddAdminService {
  name: string;
  login_id: string;
  private dbPath = '/Admins';
  addadminRef: AngularFirestoreCollection<AddAdmin> = null;
  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth, private _snackBar: MatSnackBar, private router: Router) {
    this.addadminRef = db.collection('Admins');
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.login_id = auth.email;
        this.name = this.login_id.substring(0, auth.email.lastIndexOf("@"));
      }
    });
  }

  public saveAdminData(addadmin: AddAdmin) {
    addadmin.Added_Events = [];
    addadmin.Is_Active = true;
    addadmin.Parent_ID = this.name;
    this.createAdmin(addadmin);

  }
  app2 = firebase.initializeApp(firebaseConfig, 'tempApp');
  //uploading data into firestore

  createAdmin(addadmin: AddAdmin): void {
    const admin = addadmin.Login_ID.substring(0, addadmin.Login_ID.lastIndexOf("@"));
    this.addadminRef.doc(admin).set({ ...addadmin }).then(() => {
      this.app2.auth().createUserWithEmailAndPassword(addadmin.Login_ID, addadmin.Password).then(() => {
        this._snackBar.open("Admin Added Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
      })
    }),
      this.router.navigate(['/admin/homepage']);
  }

}
