import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../shared/error-message.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuchergebnisComponent } from './suchergebnis.component';
import { WaitingModule } from '../../../shared/waiting.module';

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [
        CommonModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        RouterModule,
        ErrorMessageModule,
        WaitingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
    ],
})
export class SuchergebnisModule {}
