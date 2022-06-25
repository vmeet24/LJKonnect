import { ReadmoreService } from '../homepage/readmore.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class homepageResolver implements Resolve<any> {

    constructor(private router: Router
        , private getPosts: ReadmoreService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | any {
        return this.getPosts.getPost();
    }
}