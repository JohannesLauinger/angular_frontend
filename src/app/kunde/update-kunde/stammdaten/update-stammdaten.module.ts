import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFamilienstandModule } from './update-familienstand.module';
import { UpdateGeschlechtModule } from './update-geschlecht.module';
import { UpdateHomepageModule } from './update-homepage.module';
import { UpdateKategorieModule } from './update-kategorie.module';
import { UpdateNewsletterModule } from './update-newsletter.module';
import { UpdateOrtModule } from './update-ort.module';
import { UpdatePlzModule } from './update-plz.module';
import { UpdateStammdatenComponent } from './update-stammdaten.component';

@NgModule({
    declarations: [UpdateStammdatenComponent],
    exports: [UpdateStammdatenComponent],
    imports: [
        ReactiveFormsModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        UpdateKategorieModule,
        UpdateHomepageModule,
        UpdateGeschlechtModule,
        UpdateFamilienstandModule,
        UpdatePlzModule,
        UpdateOrtModule,
        UpdateNewsletterModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class UpdateStammdatenModule {}
