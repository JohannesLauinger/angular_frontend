// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { Suchkriterien } from '../shared/types';
import { Title } from '@angular/platform-browser';
import { Kunde, KundeService, FindError } from '../shared';
import { first, tap } from 'rxjs/operators';
import { HttpStatusCode } from '@angular/common/http';

@Component({
    selector: 'hs-suche-kunden',
    templateUrl: './suche-kunden.component.html',
    styleUrls: ['./suche-kunden.component.css'],
})
export class SucheKundenComponent implements OnInit {
    suchkriterien!: Suchkriterien;

    waiting = false;

    kunden: Kunde[] = [];

    errorMsg: string | undefined;

    // Wird von der JS-Engine aufgerufen
    constructor(
        private readonly titleService: Title,
        private readonly kundeService: KundeService,
    ) {
        console.log('SucheKundenComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    suchen(suchkriterien: Suchkriterien) {
        console.log(
            'SucheBuecherComponent.suchen(): suchkriterien=',
            suchkriterien,
        );
        this.suchkriterien = suchkriterien;

        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
        // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
        this.kundeService
            .find(this.suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                tap(result => this.setProps(result)),
                first(),
            )
            .subscribe();
    }

    private setProps(result: FindError | Kunde[]) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.handleError(result);
            return;
        }

        this.kunden = result;
        console.log('SucheBuecherComponent.setProps(): kunden=', this.kunden);
        this.errorMsg = undefined;
    }

    private handleError(err: FindError) {
        this.suchkriterien = {
            nachname: '',
            geschlecht: '',
            interessen: { lesen: false, sport: false, reisen: false },
        };
        this.kunden = [];

        const { statuscode } = err;
        console.log(
            `SucheBuecherComponent.handleError(): statuscode=${statuscode}`,
        );
        this.setErrorMsg(statuscode);
    }

    private setErrorMsg(statuscode: number) {
        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Keine Bücher gefunden.';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                console.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }

        console.log(
            `SucheBuecherComponent.setErrorMsg(): errorMsg=${this.errorMsg}`,
        );
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>$event</code> vom Typ Suchkriteriengesetzt. Diese Methode wird
     * aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     * Der aktuelle Wert vom Attribut <code>&lt;suchkriterien&gt;</code> an die
     * Kindkomponente f&uuml;r <code>&lt;suchergebnis&gt;</code> weitergereicht.
     * @param $event true f&uuml;r das Ausl&ouml;sen der Suche.
     */
    setSuchkriterien($event: Suchkriterien) {
        console.log(
            'SucheKundenComponent.setSuchkriterien(): suchkriterien=',
            $event,
        );
        this.suchkriterien = $event;
    }
}
