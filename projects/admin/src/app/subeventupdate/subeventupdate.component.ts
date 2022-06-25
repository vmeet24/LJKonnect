import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventType } from './../sub-event-form/sub-event-form.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubEvent } from '../sub-event-form/sub-event';
import { ActivatedRoute } from '@angular/router';
import { ReadmoreService } from '../homepage/readmore.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { DialogData } from '../core/DialogData';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-subeventupdate',
  templateUrl: './subeventupdate.component.html',
  styleUrls: ['./subeventupdate.component.css']
})
export class SubeventupdateComponent implements OnInit {
  //id: string;
  //subevent: SubEvent = new SubEvent();
  id1;
  id2;
  dialogcfg = {} as DialogData;
  eventTypes: EventType[] = [
    { value: 'SoloEvent', viewValue: 'Solo Event' },
    { value: 'TeamEvent', viewValue: 'Team Event' }
  ];
  PageTitle: string;
  subeventupdateForm = new FormGroup({
    Event_Name: new FormControl(''),
    Event_Start_Date: new FormControl(),
    Event_Venue: new FormControl(''),
    Event_Team_Size_max: new FormControl(''),
    Event_Team_Size_min: new FormControl(''),
    Event_End_Date: new FormControl(''),
    Event_Type: new FormControl(''),
    RegistrationFee: new FormControl('')
  });
  selectedType: string[] = ["SoloEvent"];
  subEventFeeRadios: string[] = ['Yes', 'No'];
  SubEventFeeType: boolean[] = [false];
  subEvent: SubEvent;
  constructor(private route: ActivatedRoute, private postService: ReadmoreService, private titleService: Title,
    private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router
    , private ngxLoader: NgxUiLoaderService, ) { }

  RadioChange(event, index) {
    if (event.value === "Yes") {
      this.SubEventFeeType[index] = true;
    }
    else {
      this.SubEventFeeType[index] = false;
    }
  }

  selectChange(event, index) {
    this.selectedType[index] = event.value;
  }

  ngOnInit() {
    this.ngxLoader.start()
    this.route.data.subscribe(data => {

      this.route.paramMap.subscribe(data => {
        this.id1 = data.get("id1");
        this.id2 = data.get("id2");
      })
      this.subEvent = new SubEvent();
      this.subEvent = data.subevent.data();
      this.PageTitle = "Edit " + this.subEvent.Event_Name;
      this.titleService.setTitle(this.PageTitle);
      this.subeventupdateForm.setValue({
        Event_Name: this.subEvent.Event_Name,
        Event_Start_Date: new Date((data.subevent.data().Event_Start_Date.toDate())),
        Event_Venue: this.subEvent.Event_Venue,
        Event_Team_Size_max: this.subEvent.Event_Team_Size_max,
        Event_Team_Size_min: this.subEvent.Event_Team_Size_min,
        Event_Type: this.subEvent.Event_Type,
        Event_End_Date: new Date((data.subevent.data().Event_End_Date.toDate())),
        RegistrationFee: this.subEvent.RegistrationFee
      });
      this.ngxLoader.stop()
    })
    setTimeout(() => { console.log("timeout, 3000ms") }, 3000)
  }
  subEventUpdate() {
    this.postService.updateSubEventDetails(this.subeventupdateForm.value, this.id1, this.id2);
    this.router.navigate(['/admin/event-detail', this.id1]);
    this._snackBar.open("Sub Event Updated Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
  }
  subupdate() {
    if (this.subeventupdateForm.dirty) {
      this.dialogOpen();
    }
    else {
      this.router.navigate(['/admin/event-detail', this.id1]);
      this._snackBar.open("Sub Event Updated Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    }

  }

  dialogOpen() {
    this.dialogcfg.message = "Want to Save Changes to the event?";
    this.dialogcfg.type = "warning";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "125px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subEventUpdate();
      }
      else { }
    });
  }
}
