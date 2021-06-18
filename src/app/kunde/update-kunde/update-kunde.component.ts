// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ActivatedRoute, Params } from '@angular/router';
import { Kunde, KundeService } from '../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpStatus } from '../../shared';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-kunde</code> mit Kindkomponenten
 * f&uuml;r die folgenden Tags:
 * <ul>
 *  <li> <code>hs-stammdaten</code>
 *  <li> <code>hs-schlagwoerter</code>
 * </ul>
 */
@Component({
    selector: 'hs-update-kunde',
    templateUrl: './update-kunde.component.html',
    styleUrls: ['./update-kunde.component.css'],
})
export class UpdateKundeComponent implements OnInit, OnDestroy {
    kunde: Kunde | undefined;

    errorMsg: string | undefined;

    private kundeSubscription!: Subscription;

    private errorSubscription!: Subscription;

    private idParamSubscription!: Subscription;

    private findByIdSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
    ) {
        console.log('UpdateKundeComponent.constructor()');
    }

    ngOnInit() {
        // Die Beobachtung starten, ob es ein zu aktualisierenden Kunden oder
        // einen Fehler gibt.
        this.kundeSubscription = this.subscribeKunde();
        this.errorSubscription = this.subscribeError();

        // Pfad-Parameter aus /kunden/:id/update
        this.idParamSubscription = this.subscribeIdParam();

        this.titleService.setTitle('Aktualisieren');
    }

    ngOnDestroy() {
        this.kundeSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.idParamSubscription.unsubscribe();

        if (this.findByIdSubscription !== undefined) {
            this.findByIdSubscription.unsubscribe();
        }
    }

    private subscribeKunde() {
        const next = (kunde: Kunde) => {
            this.errorMsg = undefined;
            this.kunde = kunde;
            console.log('UpdateKunde.kunde)', this.kunde);
        };
        // eslint-disable-next-line rxjs/no-ignored-error
        return this.kundeService.kundeSubject.subscribe(next);
    }

    /**
     * Beobachten, ob es einen Fehler gibt.
     */
    private subscribeError() {
        const next = (err: number | string | undefined) => {
            this.kunde = undefined;

            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            switch (err) {
                case HttpStatus.NOT_FOUND:
                    this.errorMsg = 'Kein Kunde vorhanden.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`UpdateKundeComponent.errorMsg: ${this.errorMsg}`);
        };

        // eslint-disable-next-line rxjs/no-ignored-error
        return this.kundeService.errorSubject.subscribe(next);
    }

    private subscribeIdParam() {
        const next = (params: Params) => {
            console.log('params=', params);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.findByIdSubscription = this.kundeService.findById(params.id);
        };
        // ActivatedRoute.params is an Observable
        // eslint-disable-next-line rxjs/no-ignored-error
        return this.route.params.subscribe(next);
    }
}
