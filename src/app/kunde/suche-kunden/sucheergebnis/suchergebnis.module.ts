import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../shared/error-message.module';
import { GefundeneKundenModule } from '../gefundene-kunden/gefundene-kunden.module';
import { NgModule } from '@angular/core';
import { SuchergebnisComponent } from './suchergebnis.component';

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [CommonModule, ErrorMessageModule, GefundeneKundenModule],
})
export class SuchergebnisModule {}
