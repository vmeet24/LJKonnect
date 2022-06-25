import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { AdminService } from '../core/admin.service';
import { AdmindataService } from '../core/admindata.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  name;
  parentID;
  showWelcomeText = false;
  @Input() headerTitle: string;
  constructor(private user: AdminService, private admindata: AdmindataService,
    public afAuth: AngularFireAuth, public authService: AuthService,
    private location: Location, private router: Router) { }

  toggleSideBar() {
    document.querySelector('.sidebar').classList.toggle('sidebar-open');
    document.querySelector('.page-content').classList.toggle('page-content-shift');
    document.querySelector('.top-bar').classList.toggle('top-bar-shift');
  }
  ngOnInit() {
    this.user.getCurrentAdmin().then((data) => {
      this.name = data.email.substring(0, data.email.lastIndexOf("@"));
      this.admindata.getAdmindata().then((data) => {
        this.parentID = data.Parent_ID;
      });
    });
    if (this.router.url == '/admin/homepage') {
      this.showWelcomeText = true;
    }
  }
  canAddAdmin() {
    if (this.parentID === 'master') {
      return true;
    }
    else {
      return false;
    }
  }
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/admin/login']);
      }, (error) => {
        console.error("Logout error", error);
      });
  }
}
