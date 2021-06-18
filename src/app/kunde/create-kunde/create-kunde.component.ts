// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Kunde, KundeService } from '../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
    styleUrls: ['./create-kunde.component.css'],
})
export class CreateKundeComponent implements OnInit, OnDestroy {
    form = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    private saveSubscription: Subscription | undefined;

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

    ngOnDestroy() {
        if (this.saveSubscription !== undefined) {
            this.saveSubscription.unsubscribe();
        }
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neuen Kunden anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onSave() {
        if (this.form.invalid) {
            console.log(
                'CreateKundeComponent.onSave(): Validierungsfehler',
                this.form,
            );
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const neuerKunde = Kunde.fromForm(this.form.value);
        console.log('CreateKundeComponent.onSave(): neuerKunde=', neuerKunde);

        const succesFn = (location: string | undefined) => {
            console.log(
                `CreateKundeComponent.onSave(): succesFn(); location=${location}, navigate=${HOME_PATH}`,
            );
            this.fertig = true;
            this.showWarning = false;
            this.router
                .navigate([HOME_PATH])
                .then(
                    navResult => {
                        if (navResult) {
                            console.log('CreateKUnde.onSave(): Navigation');
                            this.errorMsg = undefined;
                            return true;
                        }
                        console.error(
                            'CreateKunde.onSave(): Navigation fehlgeschlagen',
                        );
                        this.errorMsg = 'Navigation fehlgeschlagen';
                        return false;
                    },
                    () => {
                        console.error(
                            'CreateKunde.onSave(): Navigation fehlgeschlagen',
                        );
                        this.errorMsg = 'Navigation fehlgeschlagen';
                    },
                )
                .catch(err => {
                    console.error(
                        'CreateBuch.onSave(): Navigation fehlgeschlagen:',
                        err,
                    );
                    this.errorMsg = 'Navigation fehlgeschlagen';
                });
        };
        const errorFn = (
            status: number,
            // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
            errors: { [s: string]: unknown } | undefined,
        ) => {
            console.error(
                `CreateKunde.onSave(): errorFn(): status: ${status}, errors`,
                errors,
            );
            this.errorMsg = JSON.stringify(errors);
        };
        this.saveSubscription = this.kundeService.save(
            neuerKunde,
            succesFn,
            errorFn,
        );

        // dmait das (Submit-) Ereignis konsumiert wird und nciht an
        // uerbergeordnete Eltern-Komponenten propagiert wird bis zum Refresh der gesamten Seite
        return false;
    }
}
