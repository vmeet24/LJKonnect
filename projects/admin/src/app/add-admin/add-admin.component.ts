import { Component, OnInit } from '@angular/core';
import { AddAdminService } from './add-admin.service';
import { AddAdmin } from './add-admin';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogData } from '../core/DialogData';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})


export class AddAdminComponent implements OnInit {
  hide = true;
  show = false;
  submitted = false;
  PageTitle = "Add Admin";
  dialogcfg = {} as DialogData;
  isConfirm = false;
  constructor(private addadminService: AddAdminService,
    private router: Router, private dialog: MatDialog, private ngxLoader: NgxUiLoaderService, private titleService: Title) { }

  addAdminForm = new FormGroup({
    adminId: new FormControl('', Validators.required),
    adminPassword: new FormControl('', Validators.required),
    adminPhone: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.ngxLoader.start();
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.ngxLoader.stop();
  }

  save(value) {
    this.addadminService.saveAdminData(new AddAdmin(value));
    this.show = false;
    this.router.navigate(['/admin/homepage']);
  }

  onSubmit(value) {
    this.dialogOpen(value);
  }

  dialogOpen(value) {
    this.dialogcfg.message = "Are you sure you want to Continue?";
    this.dialogcfg.type = "error";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "125px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.isConfirm = result;
      if (this.isConfirm) {
        this.submitted = true;
        this.save(value);
        this.show = true;
      } else { }
    });
  }
}
