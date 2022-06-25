import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { userModel } from "./user.model"
import { MatSnackBar } from '@angular/material';
import { UserService } from './user.service';

import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { DialogData } from '../../../../admin/src/app/core/DialogData';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data: userModel = new userModel()
  dialogcfg = {} as DialogData;
  constructor(public afAuth: AngularFireAuth, private router: Router, private dialog: MatDialog,
    private user: UserService, private db: AngularFirestore, private _snackBar: MatSnackBar) { }

  doRegister(value) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.Email, value.password)
        .then(res => {
          this.SendVerificationMail(value);
          resolve(res);
        }).catch((err) => {
          console.error(err);
          reject(err);
        })
    })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail(value) {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then((response) => {
        this.user.getCurrentUser().then(user => {
          this.dataMapping(value, user.uid);
        }).catch(err => {
          console.error(err);
        })
      })
  }

  dataMapping(value, id) {
    this.data.userData(value)
    return this.db.collection("Users").doc(id).set({ ...this.data }).then(ref => {
      // console.log("working");
    }).catch(err => {
      console.error("Errors" + err);
    })
  }


  forgotPassword(value) {
    return this.afAuth.auth.sendPasswordResetEmail(value.Email).then(() => {
      this._snackBar.open("Password Reset Mail has been sent to you EMAIL ID!", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
    }).catch((err) => {
      console.error(err);

    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.Email, value.password)
        .then(res => {
          if (res.user.emailVerified == true) {
            resolve(res);
          }
          else {
            reject("Email Not Verified")
          }
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      }
      else {
        reject();
      }
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
      provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          // console.log("login", res.user);
          this.db.collection("Users").doc(res.user.uid).get().subscribe(snapshot => {
            if (snapshot.exists) {
              resolve(res);
            }
            else {
              this.dataMapping({ 'Email': res.user.email, 'Name': res.user.displayName, 'Phone': "" }, res.user.uid)
              resolve(res);
            }
          })

        }, err => {
          console.error(err);
          reject(err);
        })
    })
  }

  dialogOpen() {
    this.dialogcfg.message = "A verification Email was sent to you mail.Click on the link to verify!"
    this.dialogcfg.type = "success";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "130px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DialogComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
      else {
        // console.log("gigi");
      }
    });
  }
}