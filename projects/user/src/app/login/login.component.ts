import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../core/user.service';
import { Title } from '@angular/platform-browser';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { DialogData } from '../../../../admin/src/app/core/DialogData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedIndex = 0;
  hide = true;
  loading: boolean[] = [false];
  show = false;
  dialogcfg = {} as DialogData;
  constructor(public auth: AuthService, private dialog: MatDialog
    , private fb: FormBuilder, private user: UserService,
    private router: Router, public af: AngularFireAuth,
    private _snackBar: MatSnackBar, private titleService: Title) { }


  ngOnInit() {
    this.titleService.setTitle("LJKonnect - Login");
    // this.dialogOpen();
  }


  loginForm = new FormGroup({
    Email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  signupForm = new FormGroup({
    Name: new FormControl('', [Validators.maxLength(25), Validators.required]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
  })

  tryLogin(value) {
    this.loading[0] = true;
    if (this.loginForm.valid) {
      this.auth.doLogin(value).then(res => {
        this.loading[0] = false;
        this.router.navigate(['/homepage'])
      }).catch(err => {
        this.loading[0] = false;
        if (err == "Email Not Verified") {
          this._snackBar.open(" Email Not Verified", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
          this.af.auth.signOut()
          // this.user.getCurrentUser().then((data) => { })
        }
        else
          this._snackBar.open("Wrong Info ", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
      })
    }
    else {
      this.loading[0] = false;
      this._snackBar.open("Please Enter all required Fields!", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
    }


  }

  tryGoogleLogin() {
    this.loading[2] = true;
    this.auth.doGoogleLogin()
      .then(res => {
        this.loading[2] = false;
        this.router.navigate(['/homepage']);
      }, err => console.error(err)
      )
  }

  forgot(value) {
    this.auth.forgotPassword(value)
  }

  trySignup(value) {
    this.loading[1] = true;
    if (this.signupForm.valid) {
      this.auth.doRegister(value).then((res: any) => {
        this.loading[1] = false;
        this._snackBar.open("Click on the link sent to your mail to verify!(It might be in spam folder.)", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
      }).catch(err => {
        console.error("err");
        this.loading[1] = false;
        this._snackBar.open("Wrong Info", "Close", { duration: 12000, panelClass: ['custom-snackbar'] });
      })
    }
    else {
      this.loading[1] = false;
      this._snackBar.open("Please Enter all required Fields!", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
    }
  }

  dialogOpen() {
    this.dialogcfg.message = "A verification Email was sent to you mail.Click on the link to verify!"
    this.dialogcfg.type = "success";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "130px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DialogComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => { });
  }
}
