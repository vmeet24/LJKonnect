import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { GetPostsService } from '../core/get-posts.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  step = 0
  userEvents;
  isNoEvents = true;
  userEventDetails = []
  temp;
  PageTitle = "My Registered Events"
  constructor(private ngxLoader: NgxUiLoaderService, private route: ActivatedRoute, private getpost: GetPostsService,
    private db: AngularFirestore, private dialog: MatDialog, private titleService: Title) { }

  ngOnInit() {
    this.ngxLoader.start();

    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.route.data.subscribe((data) => {
      if (data['detail'] && data['detail'].length > 0) {
        data['detail'].forEach((element) => {
          this.userEventDetails.push(element.data());
        })
      }
      this.userEvents = data.user.RegisteredEvents;
      this.userEvents.forEach((event, index) => {
        this.getpost.getRegisteredUser(event.Event, event.id).then(data => {
          if (data) {
            this.userEvents[index].data = data;
          }
        })
      })
    })
    if (this.userEvents && this.userEvents.length > 0) {
      this.isNoEvents = false;
    }
    this.ngxLoader.stop();
  }
  swipeSidebarToggle(event) {

    if (Math.abs(event.deltaX) > 40) {
      if (event.deltaX > 0) {
        document.querySelector('.sidebar').classList.add('sidebar-open');
        document.querySelector('.top-bar').classList.add('top-bar-shift');
        document.getElementById("overlay").style.display = "block";
      }
      else {
        document.querySelector('.sidebar').classList.remove('sidebar-open');
        document.querySelector('.top-bar').classList.remove('top-bar-shift');
        document.getElementById("overlay").style.display = "none";
      }
    }
  }
  oneDayEvent(startDate, endDate) {
    if (startDate.seconds === endDate.seconds) {
      return true;
    }
    else {
      return false;
    }
  }
  setStep(index: number) {
    this.step = index;
  }

  dialogOpen(value) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = value;
    const dialogRef = this.dialog.open(UserDetailComponent, dialogConfig);
  }
  prevStep() {
    this.step--;
  }
}
