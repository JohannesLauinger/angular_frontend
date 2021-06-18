import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden.component';
import { SuchergebnisModule } from './sucheergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';
import { WaitingModule } from '../../shared/waiting.module';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// SucheBuecherModule ist ein "FeatureModule", das Features fuer Buecher bereitstellt
@NgModule({
    declarations: [SucheKundenComponent],
    exports: [SucheKundenComponent],
    imports: [
        CommonModule,
        SuchergebnisModule,
        SuchformularModule,
        WaitingModule,
    ],
    providers: [Title],
})
export class SucheKundenModule {}
