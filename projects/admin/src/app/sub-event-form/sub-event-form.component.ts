import { AddEventService } from './../add-event/add-event.service';
import { Component, OnInit } from '@angular/core';
import { SubEvent } from './sub-event';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { DialogData } from '../core/DialogData';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

export interface EventType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sub-event-form',
  templateUrl: './sub-event-form.component.html',
  styleUrls: ['./sub-event-form.component.css']
})
export class SubEventFormComponent implements OnInit {
  eventName;
  post;
  subevent: SubEvent = new SubEvent();
  selectedType: string[] = ["SoloEvent"];
  PageTitle: string;
  subEventFeeRadios: string[] = ['Yes', 'No'];
  SubEventFeeType: boolean[] = [false];
  subEventForm: FormGroup;
  dialogcfg = {} as DialogData;
  dialogOrigin: string[] = ["Remove Event", "Submit Form"];
  eventTypes: EventType[] = [
    { value: 'SoloEvent', viewValue: 'Solo Event' },
    { value: 'TeamEvent', viewValue: 'Team Event' }
  ];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private db: AngularFirestore, private x: AddEventService, private titleService: Title,
    private router: Router, private _snackBar: MatSnackBar,
    private dialog: MatDialog, private ngxLoader: NgxUiLoaderService, ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.route.paramMap.subscribe((data) => {
      this.eventName = data.get('id');
    })
    this.db.collection('Events').doc(this.eventName).get().subscribe((snapshot) => {
      this.post = snapshot.data();
    })
    this.subEventForm = this.fb.group({
      subEvents: this.fb.array([
        this.addSubEventFormGroup()
      ])
    });
    this.PageTitle = this.eventName + " Sub Events";
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.stop();
  }
  RadioChange(event, index) {
    if (event.value === "Yes") {
      this.SubEventFeeType[index] = true;
    }
    else {
      this.SubEventFeeType[index] = false;
    }
  }

  addSubEventFormGroup(): FormGroup {
    return this.fb.group({
      Event_Name: ['', Validators.required],
      Event_Start_Date: ['', Validators.required],
      Event_End_Date: ['', Validators.required],
      Event_Venue: ['', Validators.required],
      Event_Type: ['', Validators.required],
      Event_Team_Size_max: ['1', Validators.required],
      Event_Team_Size_min: ['1', Validators.required],
      HasRegistrationFee: ['', Validators.required],
      RegistrationFee: ['0', Validators.required]
    })
  }

  selectChange(event, index) {
    this.selectedType[index] = event.value;
  }
  addSubEvent() {
    (<FormArray>this.subEventForm.get('subEvents')).push(this.addSubEventFormGroup());
  }
  removeSubEvent(index) {
    this.dialogOpen(this.dialogOrigin[0], index);
  }

  SubEventRemove(index) {
    (<FormArray>this.subEventForm.get('subEvents')).removeAt(index);
    this.selectedType.splice(index, 1);
    this.SubEventFeeType.splice(index, 1);
  }


  goBack() {
    if (this.x.test != true) {
      window.history.back();
    }
  }

  addSubEventToDB() {
    if (this.x.test != true) {
      let formvalue = JSON.parse(localStorage.getItem('formvalue'));
      formvalue = formvalue['formvalue'];
      formvalue.Event_Start_Date = new Date(formvalue.Event_Start_Date);
      formvalue.Event_End_Date = new Date(formvalue.Event_End_Date);
      formvalue.Registeration_Deadline_Date = new Date(formvalue.Registeration_Deadline_Date);
      formvalue.Event_Time_Stamp = new Date(formvalue.Event_Time_Stamp);

      this._snackBar.open("Successfully Added Sub Event/s.", "Close", { duration: 1000, panelClass: ['event-add-success'] });
      const count_of_subevent = this.subEventForm.value.subEvents.length;
      formvalue.SubEventCount = count_of_subevent;
      this.db.collection('Events').doc(formvalue.Event_Name).set({ ...formvalue });
      localStorage.clear();
      this.subEventForm.value.subEvents.forEach(element => {
        this.db.collection('Events').doc(this.eventName).collection('Sub-Events').doc(element.Event_Name).set({ ...element });
      });
      this.router.navigate(['/admin/add-event/event-form', this.eventName]);
    }
    else {
      const count_of_subevent = this.subEventForm.value.subEvents.length;
      this.db.collection('Events').doc(this.eventName).update({ "Contains_SubEvent": "Yes", "SubEventCount": this.post.SubEventCount + count_of_subevent });
      this._snackBar.open("Successfully Added Sub Event/s.", "Close", { duration: 1000, panelClass: ['event-add-success'] });
      this.subEventForm.value.subEvents.forEach(element => {
        this.db.collection('Events').doc(this.eventName).collection('Sub-Events').doc(element.Event_Name).set({ ...element });
        this.x.test = false
        this.router.navigate(['/admin/event-detail', this.eventName])

      });
    }
  }

  onSubmit() {
    if (this.subEventForm.valid) {
      this.dialogOpen(this.dialogOrigin[1])
    }
    else {
      this._snackBar.open("Enter All Details Please", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    }
  }



  dialogOpen(origin, index?) {
    if (origin == this.dialogOrigin[0]) {
      this.dialogcfg.message = "Are you sure you want to Remove Sub Event?"
      this.dialogcfg.type = "error";
    } else if (origin == this.dialogOrigin[1]) {
      this.dialogcfg.message = "Are you sure you want to Continue?"
      this.dialogcfg.type = "warning";
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.height = "125px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (origin == this.dialogOrigin[1]) {
          this.addSubEventToDB();
        }
        else if (origin == this.dialogOrigin[0]) {
          this.SubEventRemove(index);
        }
      }
      else { }
    });
  }
}
