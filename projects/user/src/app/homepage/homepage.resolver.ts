import { withLatestFrom } from 'rxjs/operators';
import { GetPostsService } from './../core/get-posts.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class HomepageResolver implements Resolve<GetPostsService> {

    constructor(private router: Router
        , private getPosts: GetPostsService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | GetPostsService {
        return(this.getPosts.getPosts())
    }
}