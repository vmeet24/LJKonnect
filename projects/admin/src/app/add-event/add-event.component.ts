import { Component, OnInit } from '@angular/core';
import { AddEventService } from './add-event.service';
import { AddEvent } from './add-event';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AdmindataService } from '../core/admindata.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AdminService } from '../core/admin.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { DialogData } from '../core/DialogData';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

export interface EventType {
  value: string;
  viewValue: string;
}
export interface NextYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})


export class AddEventComponent implements OnInit {

  min = 6;
  max = 12;
  isForward = false;
  pageCounter = 0;
  eventTypes: EventType[] = [
    { value: 'SoloEvent', viewValue: 'Solo Event' },
    { value: 'TeamEvent', viewValue: 'Team Event' }
  ];
  dialogcfg = {} as DialogData;
  Years: NextYear[] = [];
  selectedEventType: string[] = ["SoloEvent"];
  is_subevent = false;
  submitted = false;
  file: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  imageCropper: any;
  imageFile: any;
  imageBlob: any;
  MainEventDetail = false;
  EventFeeInput: boolean = false;
  EventFeeRadios: string[] = ['Yes', 'No'];
  EventRadioOptions: string[] = ['Yes', 'No'];
  EventSelectType: boolean = false;
  selectedType: string;
  PageTitle = "Add Event";
  addevent: AddEvent = new AddEvent();
  showfee: boolean = false;
  name: string;
  addeventForm = new FormGroup({
    Event_Image_Link: new FormControl(''),
    Event_Name: new FormControl(''),
    Event_Description: new FormControl(''),
    Event_Disclaimer: new FormControl(''),
    Event_Start_Date: new FormControl(),
    Event_Venue: new FormControl(''),
    Event_Year: new FormControl(''),
    Event_Time: new FormControl(''),
    Contains_SubEvent: new FormControl(''),
    Event_End_Date: new FormControl(''),
    Registration_Deadline_Date: new FormControl('')
  });

  constructor(
    public admindataService: AdmindataService,
    private addeventService: AddEventService, private _snackBar: MatSnackBar,
    private router: Router, private user: AdminService, private dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService, private titleService: Title
  ) { }


  ngOnInit(): void {
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.start();
    this.setYearArray();
    (this.user.getCurrentAdmin().then((data) => {
      this.name = (data.email.substring(0, data.email.lastIndexOf('@')));
      this.ngxLoader.stop()
    }));
    let data = JSON.parse(localStorage.getItem('formvalue'));
    if (data) {
      let newdata = data['formvalue'];
      this.pageCounter += 1;

      if (this.pageCounter > 0) {
        this.isForward = true;
      }
      var data_img = localStorage.getItem('imgData');
      this.addeventForm.setValue({
        Event_Image_Link: newdata.Event_Image_Link,
        Event_Name: newdata.Event_Name,
        Event_Description: newdata.Event_Description,
        Event_Disclaimer: newdata.Event_Disclaimer,
        Event_Start_Date: new Date((newdata.Event_Start_Date)),
        Event_Venue: newdata.Event_Venue,
        Event_Year: newdata.Event_Year,
        Event_Time: newdata.Event_Time,
        Contains_SubEvent: newdata.Contains_SubEvent,
        Event_End_Date: new Date((newdata.Event_End_Date)),
        Registration_Deadline_Date: new Date((newdata.Registeration_Deadline_Date))
      });
      this.showCropper = true;
      this.croppedImage = "data:image/png;base64," + data_img;
      if (this.addeventForm.value.Contains_SubEvent == "Yes")
        this.is_subevent = true;
      else {
        this.is_subevent = false;
        (<FormControl>this.addeventForm.controls['Event_Type']).setValue(newdata.Event_Type);
        (<FormControl>this.addeventForm.controls['Event_Team_Size_max']).setValue(newdata.Event_Team_Size_max);
        (<FormControl>this.addeventForm.controls['Event_Team_Size_min']).setValue(newdata.Event_Team_Size_min);
        (<FormControl>this.addeventForm.controls['HasRegistrationFee']).setValue(newdata.HasRegistrationFee);
        (<FormControl>this.addeventForm.controls['RegistrationFee']).setValue(newdata.RegistrationFee);
      }
    }

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
    this.addeventForm.addControl('Event_Team_Size_max', new FormControl("1", Validators.required));
    this.addeventForm.addControl('Event_Team_Size_min', new FormControl("1", Validators.required));
    this.addeventForm.addControl('HasRegistrationFee', new FormControl("", Validators.required));
    this.addeventForm.addControl('RegistrationFee', new FormControl("0", Validators.required));
    this.addeventForm.addControl('Event_Type', new FormControl("0", Validators.required));
  }

  removeMainEventDetails() {
    this.addeventForm.removeControl("Event_Team_Size_max");
    this.addeventForm.removeControl("Event_Team_Size_min");
    this.addeventForm.removeControl("HasRegistrationFee");
    this.addeventForm.removeControl("RegistrationFee");
    this.addeventForm.removeControl("Event_Type");
  }

  selectChange(event) {
    this.selectedType = event.value;
  }

  FeeRadioChange(event) {
    if (event.value === "Yes") {
      this.EventFeeInput = true;
    }
    else {
      this.EventFeeInput = false;
    }

  }
  gonext(addevent) {
    localStorage.setItem('formvalue', JSON.stringify({ formvalue: addevent }));
    var newimg = this.croppedImage.replace(/^data:image\/(png|jpg);base64,/, "");
    localStorage.setItem('imgData', newimg);
    window.history.forward();
  }

  EventRadioChange(event) {
    if (event.value === "Yes") {
      this.MainEventDetail = false;
      this.showfee = false;
      this.EventFeeInput = false;
      this.is_subevent = true;
      this.removeMainEventDetails();
    }
    else {
      this.MainEventDetail = true;
      this.showfee = true;
      this.EventFeeInput = false;
      this.is_subevent = false;
      this.isForward = false;
      this.addMainEventDetails();
    }
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //this.croppedImage.substring()
    //this.imageBlob= this.dataURItoBlob(this.croppedImage);
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady() {
  }
  loadImageFailed() {
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }
  save() {
    this.addeventService.pushFileToStorage(this.addevent, this.croppedImage);
    if (this.isForward) {
      this.gonext(this.addevent);
    }
    else {
      if (!this.is_subevent) {
        localStorage.clear();
        this.router.navigate(['/admin/add-event/event-form', this.addevent.Event_Name]);
      }
      else {

        var newimg = this.croppedImage.replace(/^data:image\/(png|jpg);base64,/, "")
        localStorage.setItem('imgData', newimg);
        this.router.navigate(['/admin/sub-event', this.addevent.Event_Name]);
      }
    }
  }

  onSubmit() {
    if (this.addeventForm.valid) {
      this.dialogOpen();
    }
    else {
      this.getFormValidationErrors();
      this._snackBar.open("Enter All Details Please", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    }
  }

  getFormValidationErrors() {
    Object.keys(this.addeventForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.addeventForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  dialogOpen() {
    this.dialogcfg.message = "Are you sure you want to Continue?"
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
        this.addevent.addData_addEvent(this.addeventForm.value, this.name);
        this._snackBar.open("Event Added Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
        this.submitted = true;
        this.save();
      }
      else { }
    });
  }

}
