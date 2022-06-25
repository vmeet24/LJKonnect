import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';
import { UserService } from '../core/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  PageTitle: string;
  id: any;
  post: any;
  subEvents: any[] = [];
  step: number = 0;
  hidden = false
  UserID: any;
  alreadyRegistered = false;
  userEvents: any;
  userEventNames: string[] = [''];
  constructor(private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService, private _snackBar: MatSnackBar,
    private router: Router, private titleService: Title, private user: UserService
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.user.getCurrentUser().then((data) => {
      this.UserID = data.uid;
    });
    this.user.getCurrentUserData().then((data) => {
      this.userEvents = data.RegisteredEvents;
      this.userEvents.forEach((element, index) => {
        this.userEventNames[index] = element.Event;
      });

      this.userEventNames.forEach(element => {
        if (element === this.id) {
          this.alreadyRegistered = true;
          return
        }
      });
    })


    this.route.data.subscribe(data => {
      this.post = data['post'].data();
      this.id = data.post.id;
      this.PageTitle = this.post.Event_Name;

      data['event'].forEach((element) => {
        this.subEvents.push(element.data())
      });
      this.ngxLoader.stop();
    });


    let date = this.post.Registeration_Deadline_Date.seconds * 1000
    if (date < Date.now()) {
      this.hidden = true
    }
    else {
      this.hidden = false
    }
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
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
  register() {

    if (!this.alreadyRegistered) {
      this.router.navigate(['/registerform', this.id])
    }
    else {
      this._snackBar.open("Already Registered In the Event", "Close",
        { duration: 12000, panelClass: ['custom-snackbar'] });
      this.router.navigate(['/editregisterform', this.id])
    }
  }
  //Expansion Panel Functions//

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}

