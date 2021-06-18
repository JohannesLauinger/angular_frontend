import { CommonModule } from '@angular/common';
import { DetailsBearbeitenModule } from './details-bearbeiten.module';
import { DetailsBreadcrumbsModule } from './details-breadcrumbs.module';
import { DetailsInteressenModule } from './interessen/details-interessen.module';
import { DetailsKundeComponent } from './details-kunde.component';
import { DetailsLöschenModule } from './details-löschen.module';
import { DetailsStammdatenModule } from './stammdaten/details-stammdaten.module';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WaitingModule } from '../../shared/waiting.module';

@NgModule({
    declarations: [DetailsKundeComponent],
    exports: [DetailsKundeComponent],
    providers: [Title],
    imports: [
        CommonModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        HttpClientModule,
        ErrorMessageModule,
        WaitingModule,
        MatToolbarModule,
        MatTabsModule,
        DetailsStammdatenModule,
        DetailsInteressenModule,
        DetailsBreadcrumbsModule,
        DetailsBearbeitenModule,
        DetailsLöschenModule,
    ],
})
export class DetailsKundeModule {}
