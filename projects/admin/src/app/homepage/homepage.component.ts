import { Component, OnInit } from '@angular/core';
import { ReadmoreService } from './readmore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../core/admin.service';
import { element } from 'protractor';

export interface DialogData {
  message: string;
  type: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  posts: [];
  PageTitle = "Events";
  dialogcfg = {} as DialogData;
  adminName;
  constructor(private route: ActivatedRoute,
    private readmore: ReadmoreService, private router: Router, private dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService, private user: AdminService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.start();
    this.route.data.subscribe(data => {
      this.posts = data.post;
      this.ngxLoader.stop();
    })
    this.user.getCurrentAdmin().then((data) => {
      this.adminName = data.email.substring(0, data.email.lastIndexOf("@"));
    });
  }

  details(post) {
    this.router.navigate(["/admin/event-detail", post.id])
  }

  isMyEvent(eventCreator) {
    if (this.adminName === eventCreator) {
      return true;
    }
    else {
      return false;
    }
  }

  dialogOpen() {
    this.dialogcfg.message = "Are you sure you want to Continue?"
    this.dialogcfg.type = "success";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "150px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
