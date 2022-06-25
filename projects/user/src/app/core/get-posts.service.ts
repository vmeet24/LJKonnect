import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { resolve } from 'url';
import { UserService } from './user.service';
import * as firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  constructor(private firestore: AngularFirestore, private user: UserService) { }

  getPosts() {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Events', ref => ref.where("Is_Active", "==", true).orderBy("Event_Time_Stamp", "desc")).get().subscribe(data => resolve(data.docs))
    })
  }


  getPost(id) {
    return new Promise<any>((res, rej) => {
      this.firestore.collection('Events')
        .doc(id).get().subscribe(data => { res(data) })
    }
    )
  }

  getEventsByName() {
    return new Promise<any>((res, rej) => {
      this.user.getCurrentUserData().then((data) => {
        let regEvents = data.RegisteredEvents;
        let regEventNames = [];
        regEvents.forEach((element, index) => {
          regEventNames[index] = element.Event;
        });

        return regEventNames
      }).then(data => {
        if (data.length <= 0) {
          res();
        }
        else {
          this.firestore.collection("Events",
            ref => ref.where(firebase.firestore.FieldPath.documentId(), "in", data)).get().subscribe((event) => {
              res(event.docs)
            })
        }
      })
    })
  }

  getRegisteredUser(EventName, NodeID) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("Events").doc(EventName).collection("Registered_Users")
        .doc(NodeID).get().subscribe(data => {
          if (data.data()) {
            resolve(data.data());
          }
          else {
            resolve([])
          }
        })
    })
  }

  getPostFormFields(value) {
    return new Promise<any>((res, rej) => {
      this.firestore.collection('Events')
        .doc(value).collection('Form-Fields').get().subscribe(data => {
          res(data.docs)
        });
    })
  }
  getPostSubEvents(value) {
    return new Promise<any>((res, rej) => {
      this.firestore.collection('Events')
        .doc(value).collection('Sub-Events').get().subscribe(data => {
          res(data.docs)
        });
    })

  }

}
