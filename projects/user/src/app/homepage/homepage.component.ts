import { UserService } from './../core/user.service';
import { AuthService } from './../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name = 'NGX-UI-LOADER';
  posts: any;
  isNoEvents = true;
  PageTitle = "Events";
  UserID: string;
  alreadyRegistered = false;
  userEvents;
  userEventNames: string[] = [''];
  currDate = Date.now()
  constructor(private ngxLoader: NgxUiLoaderService, private titleService: Title,
    private router: Router, private _snackBar: MatSnackBar,
    public authService: AuthService,
    private route: ActivatedRoute,
    private user: UserService) { }


  ngOnInit() {
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.user.getCurrentUser().then((data) => {
      this.UserID = data.uid;
    });
    this.user.getCurrentUserData().then((data) => {
      this.userEvents = data.RegisteredEvents;
      this.userEvents.forEach((element, index) => {
        this.userEventNames[index] = element.Event;
      });
    })
    this.ngxLoader.start();
    this.route.data.subscribe(data => {
      this.posts = data.post;
      this.ngxLoader.stop();
    })
    if (this.posts.length > 0) {
      this.isNoEvents = false;
    }

  }

  checkDate(date) {
    if (date < this.currDate)
      return true
    else
      return false
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

  details(post) {
    this.router.navigate(['/event-detail', post.id])
  }
  register(post) {
    this.userEventNames.forEach(element => {
      if (element === post.id) {
        this.alreadyRegistered = true;
        return
      }
    });
    if (!this.alreadyRegistered) {
      this.router.navigate(['/registerform', post.id]);
    }
    else {
      this._snackBar.open("Already Registered In the Event", "Close",
        { duration: 12000, panelClass: ['custom-snackbar'] });
      this.router.navigate(['/editregisterform', post.id]);
    }
  }

}
