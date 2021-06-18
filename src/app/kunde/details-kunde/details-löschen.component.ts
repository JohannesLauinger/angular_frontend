// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/consistent-type-imports */
/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Input } from '@angular/core';
import { Kunde, KundeService } from '../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { HOME_PATH } from '../../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-löschen</code>
 */
@Component({
    selector: 'hs-details-loeschen',
    templateUrl: './details-löschen.component.html',
    styleUrls: ['./details-löschen.component.css'],
})
export class DetailsLöschenComponent implements OnInit, OnDestroy {
    @Input()
    kunde!: Kunde;

    private removeDescription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
    ) {
        console.log('DetailsLöschenComponent.constructor()');
    }

    ngOnInit() {
        console.log('DetailsLöschenComponent.kunde()=', this.kunde);
    }

    onRemove() {
        console.log('SuchergebnisComponent.onRemove(): kunde=', this.kunde);
        const successFn = () => {
            this.router
                .navigate([HOME_PATH])
                .then(
                    navResult => {
                        if (navResult) {
                            console.log('CreateKUnde.onSave(): Navigation');
                            //                            return true;
                        }
                        console.error(
                            'CreateKunde.onSave(): Navigation fehlgeschlagen',
                        );
                        // this.errorMsg = 'Navigation fehlgeschlagen';
                        return false;
                    },
                    () => {
                        console.error(
                            'CreateKunde.onSave(): Navigation fehlgeschlagen',
                        );
                        // this.errorMsg = 'Navigation fehlgeschlagen';
                    },
                )
                .catch(err => {
                    console.error(
                        'CreateBuch.onSave(): Navigation fehlgeschlagen:',
                        err,
                    );
                    // this.errorMsg = 'Navigation fehlgeschlagen';
                });
        };
        const errorFn = (status: number) =>
            console.error(`Fehler beim Loeschen: status=${status}`);
        this.removeDescription = this.kundeService.remove(
            this.kunde,
            successFn,
            errorFn,
        );

        // if (this.kunden.length > 0) {
        //     this.kunden = this.kunden.filter((k: Kunde) => k._id !== kunde._id);
        // }
    }

    ngOnDestroy() {
        if (this.removeDescription !== undefined) {
            this.removeDescription.unsubscribe();
        }
    }
}
