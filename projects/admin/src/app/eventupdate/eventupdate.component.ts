import { AddEvent } from './../add-event/add-event';
import { Component, OnInit } from '@angular/core';
import { ReadmoreService } from '../homepage/readmore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogData } from '../core/DialogData';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

export interface NextYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-eventupdate',
  templateUrl: './eventupdate.component.html',
  styleUrls: ['./eventupdate.component.css']
})
export class EventupdateComponent implements OnInit {
  id: string;
  sub: any;
  Years: NextYear[] = [];
  PageTitle = "Edit Event";
  showfee: boolean = false;
  MainEventDetail = false;
  post: any;
  EventFeeInput: boolean = false;
  is_subevent = false;
  EventFeeRadios: string[] = ['Yes', 'No'];
  EventRadioOptions: string[] = ['Yes', 'No'];
  link_image;
  dialogOrigin: string[] = ["Remove Event", "Submit Form"];
  dialogcfg = {} as DialogData;
  selectedType: string;
  updateForm = new FormGroup({
    Event_Image_Link: new FormControl(''),
    Event_Name: new FormControl(''),
    Event_Description: new FormControl(''),
    Event_Disclaimer: new FormControl(''),
    Event_Start_Date: new FormControl(),
    Event_Venue: new FormControl(''),
    Event_Year: new FormControl(''),
    Event_Time: new FormControl(''),
    Event_End_Date: new FormControl(''),
    Registeration_Deadline_Date: new FormControl(''),
    Contains_SubEvent: new FormControl('')
  });


  addEvent: AddEvent
  constructor(private route: ActivatedRoute, private titleService: Title,
    private postService: ReadmoreService, private _snackBar: MatSnackBar,
    private router: Router, private dialog: MatDialog, private ngxLoader: NgxUiLoaderService, ) { }

  ngOnInit() {
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.start()
    this.setYearArray();
    this.sub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    });
    this.route.data.subscribe(data => {
      this.addEvent = new AddEvent();
      this.post = (data.post.find((p) => p.id == this.id))
    });
    this.addEvent = this.post.data();
    this.updateForm.setValue({
      Event_Image_Link: this.addEvent.Event_Image_Link,
      Event_Name: this.addEvent.Event_Name,
      Event_Description: this.addEvent.Event_Description,
      Event_Disclaimer: this.addEvent.Event_Disclaimer,
      Event_Start_Date: this.post.data().Event_Start_Date.toDate(),
      Event_Venue: this.addEvent.Event_Venue,
      Event_Year: this.addEvent.Event_Year,
      Event_Time: this.addEvent.Event_Time,
      Event_End_Date: this.post.data().Event_End_Date.toDate(),
      Contains_SubEvent: this.addEvent.Contains_SubEvent,
      Registeration_Deadline_Date: this.post.data().Registeration_Deadline_Date.toDate()
    });

    this.link_image = this.addEvent.Event_Image_Link;
    if (this.addEvent.Contains_SubEvent === "Yes") {
      this.MainEventDetail = false;
      this.showfee = false;
      this.EventFeeInput = false;
      this.is_subevent = true;
      this.updateForm.controls['Contains_SubEvent'].disable();
    }
    else if (this.addEvent.Contains_SubEvent === "No") {
      this.MainEventDetail = true;
      this.showfee = true;
      this.EventFeeInput = false;
      this.is_subevent = false;
      this.addMainEventDetails();
    }
    this.updateForm.controls['Contains_SubEvent'].disable();
    this.ngxLoader.stop()
  }

  setYearArray() {
    let curryear = (new Date()).getFullYear();
    for (var i = 0; i < 7; i++) {
      let temp: NextYear = {
        value: curryear.toString(),
        viewValue: curryear.toString()
      };
      this.Years.push(temp);
      curryear += 1;
    }

  }


  addMainEventDetails() {
    this.updateForm.addControl('Event_Team_Size_max', new FormControl("1", Validators.required));
    this.updateForm.addControl('Event_Team_Size_min', new FormControl("1", Validators.required));
    this.updateForm.addControl('HasRegistrationFee', new FormControl("", Validators.required));
    this.updateForm.addControl('RegistrationFee', new FormControl("0", Validators.required));
    this.updateForm.addControl('Event_Type', new FormControl("0", Validators.required));

    this.updateForm.controls['Event_Type'].disable();
    this.updateForm.controls['HasRegistrationFee'].disable();
    this.updateForm.controls['RegistrationFee'].disable();
  }


  FeeRadioChange(event) {
    if (event.value === "Yes") {
      this.EventFeeInput = true;
    }
    else {
      this.EventFeeInput = false;
    }
  }
  eventUpdate(value) {
    this.postService.updateEventDetails(value, this.post.id);
    this.router.navigate(['/admin/event-detail', this.post.id]);
    this._snackBar.open("Event Updated Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
  }
  update(value) {
    if (this.updateForm.dirty) {
      this.dialogOpen(this.dialogOrigin[1], value);
    }
    else {
      this.router.navigate(['/admin/event-detail', this.post.id]);
      this._snackBar.open("Event Updated Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    }
  }
  delete() {
    this.dialogOpen(this.dialogOrigin[0]);
  }
  deleteEvent() {
    this.postService.deleteEvent(this.post.id, this.post.data().Is_Active);
    this.router.navigate(['/admin/event-detail', this.post.id]);
    this._snackBar.open("Event Disabled Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
  }



  selectChange(event) {
    this.selectedType = event.value;
  }

  dialogOpen(origin, value?) {
    if (origin == this.dialogOrigin[0]) {
      this.dialogcfg.message = "Are you sure you want to Remove Event?"
      this.dialogcfg.type = "error";
    } else if (origin == this.dialogOrigin[1]) {
      this.dialogcfg.message = "Want to Save Changes to the event?"
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
          this.eventUpdate(value);
        }
        else if (origin == this.dialogOrigin[0]) {
          this.deleteEvent();
        }
      }
      else { }
    });
  }
}
