import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  PageTitle = "About US";
  constructor(private ngxLoader: NgxUiLoaderService, private titleService: Title) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
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

}
