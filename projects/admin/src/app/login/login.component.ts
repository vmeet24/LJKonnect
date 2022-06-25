import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
// import { AppServiceService } from '../app-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/auth.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  return = '';
  error: any;
  hide = true;
  errorMessage = '';
  loading = false;

  constructor(private titleService: Title,public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, public authService: AuthService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.titleService.setTitle("Login - Admin");
  }

  loginForm = new FormGroup({
    login_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  get login_id() {
    return this.loginForm.get('login_id');
  }
  get password() {
    return this.loginForm.get('password');
  }



  tryLogin(value) {
    this.loading = true;
    this.authService.doLogin(value)
      .then(res => {
        this.loading = false;
        this.router.navigate(['/admin/homepage']);
      }, err => {
        this.loading = false;
        console.error(err);
        this.errorMessage = err.message;
      })
  }

}
