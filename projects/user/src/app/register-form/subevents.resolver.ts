import { GetPostsService } from './../core/get-posts.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, forkJoin, pipe } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators'

@Injectable()
export class SubeventsResolver implements Resolve<GetPostsService> {
    formFields: any;
    subEvents: any;
    constructor(private router: Router
        , private getPosts: GetPostsService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | GetPostsService {
        return this.getPosts.getPostSubEvents(route.paramMap.get("id"))
    }
}