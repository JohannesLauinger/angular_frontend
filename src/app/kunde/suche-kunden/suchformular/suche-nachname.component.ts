import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-nachname</code>
 */
@Component({
    selector: 'hs-suche-nachname',
    templateUrl: './suche-nachname.component.html',
    styleUrls: ['./suche-nachname.component.css'],
})
export class SucheNachnameComponent {
    nachname = '';

    constructor() {
        console.log('SucheNachnameComponent.constructor()');
    }
}
