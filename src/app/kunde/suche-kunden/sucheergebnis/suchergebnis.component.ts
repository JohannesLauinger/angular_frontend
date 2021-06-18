// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable rxjs/no-ignored-error */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable max-classes-per-file */
// Bereitgestellt durch das RouterModule
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { HttpStatus, easeIn, easeOut } from '../../../shared';
import { Kunde, KundeService } from '../../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { NgLocalization } from '@angular/common';
import { Subscription } from 'rxjs';
import type { Suchkriterien } from '../../shared/types';

@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    styleUrls: ['./suchergebnis.component.css'],
    animations: [easeIn, easeOut],
})
export class SuchergebnisComponent implements OnInit, OnDestroy {
    @Input()
    suchkriterien: Suchkriterien | undefined;

    waiting = false;

    displayedColumns: string[] = ['_id', 'nachname', 'email', 'interessen'];

    kunden: Kunde[] = [];

    errorMsg: string | undefined;

    isAdmin!: boolean;

    private kundenSubscription!: Subscription;

    private errorSubscription!: Subscription;

    private removeDescription: Subscription | undefined;

    // Empfehlung: Konstruktor nur fuer DI
    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
        console.log('SuchergebnisComponent.constructor()');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen. Entspricht @PostConstruct bei Java.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtet
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        this.kundenSubscription = this.subscribeKunden();
        this.errorSubscription = this.subscribeError();
        this.isAdmin = this.authService.isAdmin;
    }

    ngOnDestroy() {
        this.kundenSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();

        if (this.removeDescription !== undefined) {
            this.removeDescription.unsubscribe();
        }
    }

    /**
     * Den ausgwählten Kunden in der Detialsseite anzeigen.
     * @param kunde Der ausgewählte Kunde
     */
    onClick(kunde: Kunde) {
        console.log('SuchergebnisComponent.onSelect(): kunde=', kunde);
        // Puffern im Singleton, um nicht erneut zu suchen
        this.kundeService.kunde = kunde;
        // TODO: NavigationExtras beim Routing
        // https://github.com/angular/angular/pull/27198
        // https://github.com/angular/angular/commit/67f4a5d4bd3e8e6a35d85500d630d94db061900b
        /* eslint-disable object-curly-newline */
        return this.router.navigate(['..', kunde._id], {
            relativeTo: this.route,
        });
        /* eslint-enable object-curly-newline */
    }

    /**
     * Den ausgewählten Kunden durch anklick löschen
     * @param kunde Der ausgewählte Kunde
     */
    onRemove(kunde: Kunde) {
        console.log('SuchergebnisComponent.onRemove(): kunde=', kunde);
        const successFn: (() => void) | undefined = undefined;
        const errorFn = (status: number) =>
            console.error(`Fehler beim Loeschen: status=${status}`);
        this.removeDescription = this.kundeService.remove(
            kunde,
            successFn,
            errorFn,
        );
        if (this.kunden.length > 0) {
            this.kunden = this.kunden.filter((k: Kunde) => k._id !== kunde._id);
        }
    }

    private subscribeKunden() {
        const next = (kunden: Kunde[]) => {
            this.reset();
            this.errorMsg = undefined;

            this.kunden = kunden;
            console.log(
                'SuchErgebnisComponent.subscribeKunden: this.kunden',
                this.kunden,
            );
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request auch abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        return this.kundeService.kundenSubject.subscribe(next);
    }

    /**
     * Methode, um den injizierten <code>BuchService</code> zu beobachten,
     * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
     * Tag <code>error-message</code> dargestellt werden. Diese private Methode
     * wird in der Methode <code>ngOnInit</code> aufgerufen.
     */
    private subscribeError() {
        const next = (err: number | number | string | undefined) => {
            this.reset();
            this.kunden = [];

            console.log('SuchErgebnisComponent.subscribeError: err=', err);
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            switch (err) {
                case HttpStatus.NOT_FOUND:
                    this.errorMsg = 'Keine Kunden gefunden';
                    break;
                case HttpStatus.TOO_MANY_REQUESTS:
                    this.errorMsg =
                        'Zu viele Anfragen. Bitte versuchen Sie es später erneut.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten';
                    break;
            }
            console.log(`SuchErgebnisComponent.errorMsg: ${this.errorMsg}`);
        };

        return this.kundeService.errorSubject.subscribe(next);
    }

    private reset() {
        this.suchkriterien = {
            nachname: '',
            geschlecht: '',
            interessen: { reisen: false, lesen: false, sport: false },
        };
        this.waiting = false;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}
/* eslint-enable max-classes-per-file */
