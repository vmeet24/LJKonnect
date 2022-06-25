import { GetPostsService } from './../core/get-posts.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class EventResolver implements Resolve<GetPostsService> {

    constructor(private router: Router
        , private getPosts: GetPostsService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<GetPostsService>
        | Promise<GetPostsService> | GetPostsService {
        return this.getPosts.getPost(route.paramMap.get("id"));
    }
}