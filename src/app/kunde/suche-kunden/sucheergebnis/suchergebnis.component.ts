import { Component, Input, OnInit } from '@angular/core';
import type { Kunde } from '../../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um das Ergebnis der
 * Suche anzuzeigen, d.h. die gefundenen B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
})
export class SuchergebnisComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [buecher]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunden: Kunde[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
    }

    ngOnInit(): void {
        log.debug('SuchergebnisComponent.ngOnInit(): kunden=', this.kunden);
    }
}
