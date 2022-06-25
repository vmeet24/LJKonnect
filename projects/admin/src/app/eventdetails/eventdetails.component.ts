import { AddEventService } from './../add-event/add-event.service';
import { Component, OnInit } from '@angular/core';
import { ReadmoreService } from '../homepage/readmore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../core/admin.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogData } from '../core/DialogData';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {
  id: any;
  post: any;
  loading: boolean[] = [false];
  sub: any;
  posts: any;
  subposts: any;
  step = 0;
  isEditable = false;
  PageTitle: string;
  name: string;
  active;
  btnColour;
  dialogcfg = {} as DialogData;
  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar, private titleService: Title,
    private dialog: MatDialog,
    private postService: ReadmoreService, private y: AddEventService,
    private router: Router, private user: AdminService, private ngxLoader: NgxUiLoaderService, ) {
  }
  ngOnInit() {
    //  this.postService.getRegsiteredUserArray("LUMINA & CRAVIOTIC");
    this.ngxLoader.start();
    this.sub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.user.getCurrentAdmin().then((data) => {
      this.name = data.email.substring(0, data.email.lastIndexOf("@"));

      if (this.post.data().Is_Active) {
        this.btnColour = "red";
        this.active = "Disable-Event"
      }
      else {
        this.btnColour = "green";
        this.active = "Enable-Event"
      }
      if (this.post.data().created_By == this.name) {
        this.isEditable = true;
      }
    });
    //getting data from resolver and matching it
    this.route.data.subscribe(data => {
      this.post = (data.post.find((p) => p.id == this.id));
      this.PageTitle = this.post.data().Event_Name;
      this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    });
    this.postService.getsubEventDetails(this.id).then((docs) => {
      this.subposts = docs;
    });
    // console.log(this.post.id);


    this.ngxLoader.stop()
  }
  updateform() {
    this.router.navigate(["/admin/event-update", this.post.id])
  }
  //Expansion Panel Functions//
  updateSubEvents(id) {
    this.router.navigate(["/admin/sub-event-update", this.post.id, id])
  }

  addsub() {
    this.y.checksubevent(true);
    this.router.navigate(['/admin/sub-event', this.post.id])
  }
  disableEvent() {
    var btn = document.getElementById("disableBtn");
    if (btn.style.color = "red") {
      var msg = "Are you sure you want to Disable Event?";
      var type = "error";
      this.dialogOpen(msg, type);
    }
    else if (btn.style.color = "green") {
      var msg = "Are you sure you want to Enable Event?";
      var type = "success";
      this.dialogOpen(msg, type);
    }
  }
  GetUsers(){
    this.router.navigate(["/admin/register-users", this.id])
  }
  ConfirmRegistration() {
    this.router.navigate(["/admin/confirm-registration", this.id])
  }
  dialogOpen(msg, type) {
    this.dialogcfg.message = msg;
    this.dialogcfg.type = type;
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
        this.postService.deleteEvent(this.post.id, this.post.data().Is_Active);
      } else { }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  getuserdata(subeventID, subevent_data) {
    this.postService.getusersdata(this.post.id, this.post.data(), subeventID, subevent_data);

  }

  getuser_solo_data() {
    this.postService.getuserssolodata(this.post.id, this.post.data());
  }
}
