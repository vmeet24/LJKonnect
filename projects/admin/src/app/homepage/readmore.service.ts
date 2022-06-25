import { AddEvent } from './../add-event/add-event';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SubEvent } from '../sub-event-form/sub-event';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ReadmoreService {


  constructor(private firestore: AngularFirestore, private router: Router) {
  }
  getPost() {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Events', ref => ref.orderBy("Event_Time_Stamp", "desc")).get()
        .subscribe(data => {
          resolve(data.docs)
        })
    })
  }

  getsubEventDetails(id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("Events").
        doc(id).collection("Sub-Events").get().subscribe((data) => resolve(data.docs))
    })
  }

  getSpecificSubEventDetail(mainEventid, subEventid) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("Events").doc(mainEventid).
        collection("Sub-Events").doc(subEventid).get().subscribe((data) => resolve(data))
    })
  }

  updateSubEventDetails(subevent: SubEvent, id1, id2) {
    this.firestore.collection('Events').doc(id1).collection('Sub-Events').doc(id2).update(subevent);

  }

  getEventDetails() {
    return
    this.firestore.collection("Event_Description").snapshotChanges();
  }
  updateEventDetails(addevent: AddEvent, id) {
    this.firestore.collection('Events').doc(id).update(addevent);
  }

  deleteEvent(id: any, value) {
    // this.router.navigate(['/homepage']);
    this.firestore.collection("Events").doc(id).update({ "Is_Active": !value }).then(() => {
      location.reload()
    })
  }




  convertToCsv(arr_users, id_subevent) {
    let csv = '';
    let header = Object.keys(arr_users[0]).join(',');
    let values = arr_users.map(o => Object.values(o).map(d => { if (d instanceof Array) { d = d.join(';') } return d }).join(',')).join('\n');
    console.log(values);

    csv += header + '\n' + values;
    // this.downloadFile(csv, id_subevent);
  }


  getusersdata(id, data_of_event, id_subevent, data_of_subevent) {
    const arr_users = []

    this.firestore.collection('Events').doc(id).collection('Registered_Users').get().subscribe(res => {

      res.docs.forEach(function (docs) {
        let data = docs.data();
        let event = data.RegisteredSubEvents;
        let count = event.length;

        for (let i_event = 0; i_event < count; i_event++) {

          if (event[i_event].SubEventName == id_subevent) {
            if (data_of_subevent.Event_Type === "TeamEvent") {
              let teamcount = event[i_event].TeamDetails.length;
              for (let j_team = 0; j_team < teamcount; j_team++) {
                data["Member " + (j_team + 1) + "_name"] = event[i_event].TeamDetails[j_team].Team_Member_Name;
                data["Member " + (j_team + 1) + "_email"] = event[i_event].TeamDetails[j_team].Team_Member_Email;
                data["Member " + (j_team + 1) + "_phoneNumber"] = event[i_event].TeamDetails[j_team].Team_Member_Phone;
              }
            }
            delete data['RegisteredSubEvents'];
            arr_users.push(data);
            break;
          }
        }
      })
      if (arr_users.length > 0) {
        this.convertToCsv(arr_users, id_subevent);
      }
      else {
      }
    })
  }


  ConvertToCSV(objArray, headerList) {
    console.log(objArray);
    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No, ';
    for (let index in headerList) {
      row += headerList[index] + ', ';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }

    this.downloadFile(str, "id_subevent");
    // return str;
  }


  downloadFile(csvData, filename) {
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }



  getRegsiteredUserArray(eventid) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Events').doc(eventid).collection('Registered_Users').get().subscribe(res => {
        // console.log(res.docs);

        resolve(res.docs);
      })
    })
  }

  getuserssolodata(eventid, eventdata) {
    const arr_users = [];
    this.firestore.collection('Events').doc(eventid).collection('Registered_Users').get().subscribe(res => {
      res.docs.forEach(function (docs) {
        //arr_users.push(docs.data());
        console.log(docs.data());

        let data = docs.data();
        if (eventdata.Event_Type === "TeamEvent") {

          let teamcount = data.TeamDetails.length;

          for (let j_team = 0; j_team < teamcount; j_team++) {
            data["Member" + (j_team + 1) + "_name"] = data.TeamDetails[j_team].Team_Member_Name;
            data["Member" + (j_team + 1) + "_email"] = data.TeamDetails[j_team].Team_Member_Email;
            data["Member" + (j_team + 1) + "_phoneNumber"] = data.TeamDetails[j_team].Team_Member_Phone;
          }
          delete data['TeamDetails'];
          arr_users.push(data);
        }
        else {
          arr_users.push(data);
        }
      })

      if (arr_users.length > 0) {
        this.convertToCsv(arr_users, eventid);
      }
      else {

      }
    })
  }
}
