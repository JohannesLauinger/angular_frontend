/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { Buch, BuchService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import type { DataItem, MultiSeries } from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { KeineBuecherError } from './errors';
import type { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Liniendiagramm.
 */
@Component({
    selector: 'hs-liniendiagramm',
    templateUrl: './liniendiagramm.html',
})
export class LiniendiagrammComponent implements OnInit {
    series!: MultiSeries;

    constructor(
        private readonly buchService: BuchService,
        private readonly titleService: Title,
    ) {
        log.debug('LiniendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Liniendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('LiniendiagrammComponent.ngOnInit()');
        this.setSeries();
        this.titleService.setTitle('Liniendiagramm');
    }

    private setSeries() {
        this.buchService
            .find()
            .pipe(
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineBuecherError();
                    }

                    return result.filter(buch => buch.rating !== undefined);
                }),
                first(),
                tap(buchItems => {
                    const bewertungItems = this.getBewertungItems(buchItems);
                    const preisItems = this.getPreisItems(buchItems);
                    this.initSeries(bewertungItems, preisItems);
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart
    private getBewertungItems(buecher: Buch[]) {
        return buecher.map(buch => {
            const bewertungItem: DataItem = {
                name: buch._id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: buch.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            };
            return bewertungItem;
        });
    }

    private getPreisItems(buecher: Buch[]) {
        return buecher.map(buch => {
            const preisItem: DataItem = {
                name: buch._id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: buch.preis,
            };
            return preisItem;
        });
    }

    private initSeries(bewertungItems: DataItem[], preisItems: DataItem[]) {
        const series: MultiSeries = [
            {
                name: 'Bewertungen',
                series: bewertungItems,
            },
            {
                name: 'Preise',
                series: preisItems,
            },
        ];

        this.series = series;
    }
}