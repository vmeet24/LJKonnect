import { UserService } from './../core/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { GetPostsService } from '../core/get-posts.service';

@Injectable()
export class MyEventsDetailsResolver implements Resolve<any> {

    constructor(private router: Router,
        private post : GetPostsService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | any {
       
        return (this.post.getEventsByName())
    }
}