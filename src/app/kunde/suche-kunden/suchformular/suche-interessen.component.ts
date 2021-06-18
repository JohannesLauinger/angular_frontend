import { Component } from '@angular/core';

@Component({
    selector: 'hs-suche-interessen',
    templateUrl: './suche-interessen.component.html',
    styleUrls: ['./suche-interessen.component.css'],
})
export class SucheInteressenComponent {
    reisen = false;

    lesen = false;

    sport = false;

    constructor() {
        console.log('SucheInteressenComponent.constructor()');
    }
}
