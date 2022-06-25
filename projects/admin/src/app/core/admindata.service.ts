import { Injectable } from '@angular/core';
import { AdminDataModel } from './addmindata.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdmindataService {
  admin;
  login_id;
  
  constructor( 
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { 
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.login_id=auth.email;
          this.admin = this.login_id.substring(0, auth.email.lastIndexOf("@"));
        }});
    }

    getAdmindata(){
    return new Promise<any>((resolve, reject) => {        
        this.db.collection('Admins').doc(this.admin).get().subscribe((res)=>{
          if(res){
            const rData = res.data();
            resolve(rData);
          }
          else
            reject('Not found');
        })
    })
}

updatedata(res){
  this.db.collection('Admins').doc(this.admin).set(res);
}

}
