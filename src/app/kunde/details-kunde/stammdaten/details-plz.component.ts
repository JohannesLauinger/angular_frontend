import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-plz</code>
 */
@Component({
    selector: 'hs-details-plz',
    templateUrl: './details-plz.component.html',
    styleUrls: ['./details-plz.component.css'],
})
export class DetailsPlzComponent implements OnInit {
    @Input()
    plz: string | undefined;

    ngOnInit() {
        console.log(`DetailsPlzComponent.plz=${this.plz}`);
    }
}
