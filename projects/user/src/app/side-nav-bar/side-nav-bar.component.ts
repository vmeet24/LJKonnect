import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  @Input() headerTitle: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  toggleSideBar() {

    var sidebar_condition = document.querySelector('.sidebar').classList;
    var topbar_condition = document.querySelector('.top-bar').classList;

    if (!sidebar_condition.contains('sidebar-open') && !topbar_condition.contains('top-bar-shift')) {
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


  logout() {
    this.authService.doLogout()
      .then(() => {
        this.router.navigate(["/"])
      }, (error) => {
        console.error("Logout error", error);
      });
  }
}
