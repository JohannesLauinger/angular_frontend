// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/sort-type-union-intersection-members */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateKundeComponent } from './create-kunde.component';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Observable } from 'rxjs';

// https://angular.io/api/router/CanDeactivate
// https://angular.io/guide/router#can-deactivate-guard

@Injectable({ providedIn: 'root' })
export class CreateKundeGuard implements CanDeactivate<CreateKundeComponent> {
    constructor() {
        console.log('CreateKundeGuard.constructor()');
    }

    canDeactivate(
        createKunde: CreateKundeComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (createKunde.fertig) {
            // Seite darf zur gewuenschten URL verlassen werden
            return true;
        }

        createKunde.showWarning = true;
        createKunde.fertig = true;
        console.warn('CreateKundeGuard.canDeactivate(): Verlassen der Seite');
        return false;
    }
}
