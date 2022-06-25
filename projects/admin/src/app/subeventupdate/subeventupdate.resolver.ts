import { ReadmoreService } from '../homepage/readmore.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class SubeventupdateResolver implements Resolve<ReadmoreService> {

    constructor(private router: Router
        , private readMore: ReadmoreService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>
        | Promise<any> | ReadmoreService {
        console.log("resolver");
        return this.readMore.
            getSpecificSubEventDetail(route.paramMap.get("id1"), route.paramMap.get("id2"))
    }
}