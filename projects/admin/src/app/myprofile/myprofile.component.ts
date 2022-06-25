import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/admin.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAdminModel } from '../core/admin.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'page-user',
  templateUrl: 'myprofile.component.html',
  styleUrls: ['myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  PageTitle: string;
  admin: FirebaseAdminModel = new FirebaseAdminModel();
  name: string;
  added_events;
  constructor(
    private titleService: Title,
    public adminService: AdminService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private ngxLoader: NgxUiLoaderService,
    // private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.ngxLoader.start();
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.admin = data;
        this.added_events = data.added_events;
        this.name = this.admin.login_id.substring(0, this.admin.login_id.lastIndexOf('@'));
        this.titleService.setTitle(this.name + "'s Profile");
        this.PageTitle = this.name + " Profile";
      }
      this.ngxLoader.stop()
    })
  }

}