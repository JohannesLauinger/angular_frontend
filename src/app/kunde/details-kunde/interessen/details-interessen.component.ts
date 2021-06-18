import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-schlagwoerter</code>
 */
@Component({
    selector: 'hs-details-interessen',
    templateUrl: './details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    // <hs-interessen [values]="kunde.schlagwoerter">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    values!: string[];

    ngOnInit() {
        log.debug('DetailsInteressenComponent.values=', this.values);
    }
}
