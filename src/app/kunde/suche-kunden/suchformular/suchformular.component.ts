import { Component, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheInteressenComponent } from './suche-interessen.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import type { Suchkriterien } from '../../shared/types';
import { fadeIn } from '../../../shared';

@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    styleUrls: ['./suchformular.component.css'],
    animations: [fadeIn],
})
export class SuchformularComponent {
    // Event Binding: <hs-suchformular (waiting)="...">
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject statt der Basisklasse Observable, damit next() in onFind() aufgerufen werden kann
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    // DI der Child-Komponente, um auf deren Attribut (hier: "nachname") zuzugreifen
    // @Output in SucheNahcnameComponent wuerde Subject<> erfordern
    // https://angular.io/guide/component-interaction#parent-calls-an-viewchild
    // query results available in ngOnInit
    @ViewChild(SucheNachnameComponent, { static: true })
    private readonly sucheNachnameComponent!: SucheNachnameComponent;

    // @ViewChild(SucheEmailComponent, { static: true })
    // private readonly sucheEmailComponent!: SucheEmailComponent;

    @ViewChild(SucheGeschlechtComponent, { static: true })
    private readonly sucheGeschlechtComponent!: SucheGeschlechtComponent;

    @ViewChild(SucheInteressenComponent, { static: true })
    private readonly sucheInteressenComponent!: SucheInteressenComponent;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        console.log('Suchformular.Component.constructor()');
    }

    /**
     * Suche nach kunden, die den spezifizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgeloeste Ereignis
     *  zu konsumieren
     */
    onFind() {
        const { nachname } = this.sucheNachnameComponent;
        // const { email } = this.sucheEmailComponent;
        const { geschlecht } = this.sucheGeschlechtComponent;
        const { reisen } = this.sucheInteressenComponent;
        const { sport } = this.sucheInteressenComponent;
        const { lesen } = this.sucheInteressenComponent;
        console.log(
            `SuchformularComponent.onFind(): titel=${nachname},
                geschlecht=${geschlecht}, reisen=${reisen}, lesen=${lesen}, sport=${sport}`,
        );

        this.suchkriterien$.next({
            nachname,
            geschlecht,
            interessen: { lesen, reisen, sport },
        });

        return false;
    }
}
