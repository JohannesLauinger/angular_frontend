import { CommonModule } from '@angular/common';
import { DetailsEmailModule } from './details-email.module';
import { DetailsFamilienstandModule } from './details-familienstand.module';
import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module';
import { DetailsGeschlechtModule } from './details-geschlecht.module';
import { DetailsHomepageModule } from './details-homepage.module';
import { DetailsKategorieModule } from './details-kategorie.module';
import { DetailsNachnameModule } from './details-nachname.module';
import { DetailsNewsletterModule } from './details-newsletter.module';
import { DetailsOrtModule } from './details-ort.module';
import { DetailsPlzModule } from './details-plz.module';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        DetailsNachnameModule,
        DetailsEmailModule,
        DetailsKategorieModule,
        DetailsGeburtsdatumModule,
        DetailsHomepageModule,
        DetailsGeschlechtModule,
        DetailsFamilienstandModule,
        DetailsPlzModule,
        DetailsOrtModule,
        DetailsNewsletterModule,
    ],
})
export class DetailsStammdatenModule {}
