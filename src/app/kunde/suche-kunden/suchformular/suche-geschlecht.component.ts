import { Component } from '@angular/core';
import type { Geschlecht } from '../../shared/kunde';

@Component({
    selector: 'hs-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
    styleUrls: ['./suche-geschlecht.component.css'],
})
export class SucheGeschlechtComponent {
    geschlecht: Geschlecht | '' = '';

    constructor() {
        console.log('SucheGeschlechtComponent.constructor()');
    }
}
