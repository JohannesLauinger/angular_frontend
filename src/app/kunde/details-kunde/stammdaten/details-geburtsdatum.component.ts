import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-datum</code>
 */
@Component({
    selector: 'hs-details-geburtsdatum',
    templateUrl: './details-geburtsdatum.component.html',
    styleUrls: ['./details-geburtsdatum.component.css'],
})
export class DetailsGeburtsdatumComponent implements OnInit {
    @Input()
    formatted!: string;

    ngOnInit() {
        console.log(`DetailsDatumComponent: formatted=${this.formatted}`);
    }
}
