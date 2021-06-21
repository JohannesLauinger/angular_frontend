// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-imports */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Kunde, KundeService, SaveError } from '../shared';
import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../shared';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { first, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import type { KundeForm } from './../shared/kunde';

@Component({
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
    styleUrls: ['./create-kunde.component.css'],
})
export class CreateKundeComponent implements OnInit {
    form = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        console.log('CreateKundeComponent.constructor()');
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (router !== undefined) {
            console.log('Injizierter Router:', router);
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Neuer Kunde');
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neuen Kunden anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        if (this.form.invalid) {
            console.debug(
                'CreateKundeComponent.onSave(): Validierungsfehler',
                this.form,
            );
        }

        const kundeForm: KundeForm = this.form.value; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        const neuesKunde = Kunde.fromForm(kundeForm);
        console.debug('CreateKundeComponent.onSave(): neuesKunde=', neuesKunde);

        this.kundeService
            .save(neuesKunde)
            .pipe(
                tap(result => this.setProps(result)),
                first(),
            )
            .subscribe({ next: () => this.next() });
    }

    private setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        console.debug(`CreateKundeComponent.onSave(): id=${id}`);
    }

    private handleError(err: SaveError) {
        const { statuscode } = err;
        console.debug(
            `CreateKundeComponent.handleError(): statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.BadRequest: {
                const { cause } = err;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }

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
    }

    private async next() {
        if (this.errorMsg === undefined) {
            console.debug('CreateKundeComponent.next(): Navigation');
            await this.router.navigate([HOME_PATH]);
        }
    }
}
