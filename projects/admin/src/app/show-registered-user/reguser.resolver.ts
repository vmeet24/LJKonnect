import { ReadmoreService } from '../homepage/readmore.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class RegisterResolver implements Resolve<ReadmoreService> {

    constructor(private router: Router
        , private readmore: ReadmoreService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ReadmoreService>
        | Promise<ReadmoreService> | ReadmoreService {
        return this.readmore.getRegsiteredUserArray(route.paramMap.get('id'));
    }
}