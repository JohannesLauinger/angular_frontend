import { Component, Input } from '@angular/core';
import type { Familienstand } from '../../shared/kunde';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-verlag</code>
 */
@Component({
    selector: 'hs-details-familienstand',
    templateUrl: './details-familienstand.component.html',
    styleUrls: ['./details-familienstand.component.css'],
})
export class DetailsFamilienstandComponent implements OnInit {
    @Input()
    familienstand: Familienstand | '' | undefined;

    ngOnInit() {
        console.log(
            `DetailsFamilienstandComponent.familienstand=${this.familienstand}`,
        );
    }
}
