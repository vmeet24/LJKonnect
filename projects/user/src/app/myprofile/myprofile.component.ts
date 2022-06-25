import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader'

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  editProfile: boolean = false;
  PageTitle = "My Profile";
  user;
  constructor(private ngxLoader: NgxUiLoaderService, private route: ActivatedRoute,private titleService: Title) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.route.data.subscribe(data => {
      this.user = data.user[0].data()
      this.ngxLoader.stop()
    })
    this.titleService.setTitle("LJKonnect - "+this.user.Name+"'s Profile");
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
  EditProfile() {
    this.editProfile = !this.editProfile;
  }
  CancelEdit() {
    this.editProfile = false;
  }

  SaveProfile() {
    this.editProfile = false;
  }

}
