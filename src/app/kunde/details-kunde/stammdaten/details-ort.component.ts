import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-ort</code>
 */
@Component({
    selector: 'hs-details-ort',
    templateUrl: './details-ort.component.html',
    styleUrls: ['./details-ort.component.css'],
})
export class DetailsOrtComponent implements OnInit {
    @Input()
    ort: string | undefined;

    ngOnInit() {
        console.log(`DetailsOrtComponent.ort=${this.ort}`);
    }
}
