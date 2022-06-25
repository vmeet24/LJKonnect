import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AddEvent } from './add-event';
import { AngularFireStorage, StorageBucket } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdmindataService } from '../core/admindata.service';


@Injectable({
  providedIn: 'root'
})
export class AddEventService {
  name: string;
  test: boolean;
  private dbPath = '/Events';
  private basePath = '/uploads';
  final: string
  addeventRef: AngularFirestoreCollection<AddEvent> = null;
  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private storage: AngularFireStorage, private admindataservice: AdmindataService) {
    this.addeventRef = db.collection(this.dbPath);


    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.name = auth.email.substring(0, auth.email.lastIndexOf("@"));
      }
    });

  }

  gonext() {
    window.history.forward();
  }

  pushFileToStorage(addevent: AddEvent, meet) {

    const filePath = `${this.basePath}/${addevent.Event_Name}`;
    this.final = meet;

    const storageRef = this.storage.ref(filePath);
    const uploadTask = storageRef.putString(this.final.substring(this.final.indexOf(',') + 1, this.final.length), 'base64', { contentType: 'image/jpg' })
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          addevent.Event_Image_Link = downloadURL;
          this.createEvent(addevent);

        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();

  }

  //uploading data into firestore
  createEvent(addevent: AddEvent): void {
    //use core services
    this.admindataservice.getAdmindata().then(res => {
      res.Added_Events.push(addevent.Event_Name);///this line
      this.admindataservice.updatedata(res);
      //storing data locally  
      if (addevent.Contains_SubEvent === "Yes") {

        localStorage.setItem('formvalue', JSON.stringify({ formvalue: addevent }));

      }
      else
        this.db.collection('Events').doc(addevent.Event_Name).set({ ...addevent });
    })
  }
  checksubevent(s?) {
    this.test = s
  }

}
