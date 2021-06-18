import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-nachname</code>
 */
@Component({
    selector: 'hs-details-nachname',
    templateUrl: './details-nachname.component.html',
    styleUrls: ['./details-nachname.component.css'],
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    nachname!: string;

    ngOnInit() {
        console.log(`DetailsNachanmeComponent.nachname=${this.nachname}`);
    }
}
