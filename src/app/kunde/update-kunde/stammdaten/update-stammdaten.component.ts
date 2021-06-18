// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Kunde, KundeService } from '../../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-stammdaten</code>
 */
@Component({
    selector: 'hs-update-stammdaten',
    templateUrl: './update-stammdaten.component.html',
})
export class UpdateStammdatenComponent implements OnInit, OnDestroy {
    // <hs-update-stammdaten [kunde]="...">
    @Input()
    kunde!: Kunde;

    readonly form = new FormGroup({});

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        console.log('UpdateStammdatenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Stammdaten des zu &auml;ndernden Kunden vorbelegen.
     */
    ngOnInit() {
        console.log('UpdateStammdatenComponent.ngOnInit(): kunde=', this.kunde);
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateStammdatenComponent.onUpdate(): keine Aenderungen',
            );
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.kunde === undefined) {
            console.error(
                'UpdateStammdatenComponent.onUpdate(): kunde === undefined',
            );
            return;
        }

        // rating, preis und rabatt koennen im Formular nicht geaendert werden
        this.kunde.updateStammdaten(
            this.kunde.nachname,
            this.kunde.email,
            this.kunde.kategorie,
            this.kunde.geburtsdatum,
            this.form.value.homepage,
            this.form.value.geschlecht,
            this.form.value.familienstand,
            this.form.value.plz,
            this.form.value.ort,
            this.form.value.newsletter,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateStammdaten.onUpdate(): successFn: path: kunden/${this.kunde._id}`,
            );
            this.router
                .navigate(['..'], { relativeTo: this.route })
                .then(
                    navResult => {
                        if (navResult) {
                            console.log(
                                'UpdateStammdaten.onUpdate(): Navigation',
                            );
                            return true;
                        }
                        console.error(
                            'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                    () => {
                        console.error(
                            'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                        );
                        return false;
                    },
                )
                .catch(err =>
                    console.error(
                        'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen:',
                        err,
                    ),
                );
        };
        const errorFn: (
            status: number,
            errors: Record<string, unknown> | undefined,
        ) => void = (status, errors) => {
            console.error(
                `UpdateStammdatenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };

        this.updateSubscription = this.kundeService.update(
            this.kunde,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }
}
