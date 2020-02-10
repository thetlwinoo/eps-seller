import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Injectable()
export class BreadcrumbGuard implements CanActivate {
    routeParams = '';
    constructor(private service: BreadcrumbService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const crumbs = route.data['crumbs'];   
        this.service.setCrumbs(crumbs);
        return true;
    }
}