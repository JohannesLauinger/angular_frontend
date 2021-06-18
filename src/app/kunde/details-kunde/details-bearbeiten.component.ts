import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-bearbeiten</code>
 */
@Component({
    selector: 'hs-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    id: string | undefined;

    ngOnInit() {
        log.debug(`DetailsBearbeitenComponent.id=${this.id}`);
    }
}
