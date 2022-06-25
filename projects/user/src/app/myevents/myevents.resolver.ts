import { UserService } from './../core/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class MyEventsResolver implements Resolve<any> {

    constructor(private router: Router,
        private user : UserService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | any {
        return (this.user.getCurrentUserData())
    }
}