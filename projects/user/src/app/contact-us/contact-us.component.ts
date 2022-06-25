import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  min = 6;
  max = 12;
  PageTitle = "Contact US!"
  mail = "https://us-central1-ljkonnect-bb276.cloudfunctions.net/submit"
  constructor(private ngxLoader: NgxUiLoaderService, private http: HttpClient, private titleService: Title) { }
  contactForm = new FormGroup({
    //name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  })
  ngOnInit() {
    this.ngxLoader.start();
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.stop();
  }

  sendMessage() {
    if (this.contactForm.valid) {
      this.http.post(this.mail, this.contactForm.value).subscribe();
    }
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

