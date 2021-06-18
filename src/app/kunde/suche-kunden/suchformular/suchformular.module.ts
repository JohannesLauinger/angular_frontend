import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NgModule } from '@angular/core';

import { SucheEmailModule } from './suche-email.module';
import { SucheGeschlechtModule } from './suche-geschlecht.module';
import { SucheInteressenModule } from './suche-interessen.module';
import { SucheNachnameModule } from './suche-nachname.module';
import { SuchformularComponent } from './suchformular.component';

@NgModule({
    declarations: [SuchformularComponent],
    exports: [SuchformularComponent],
    imports: [
        FormsModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        SucheNachnameModule,
        MatCardModule,
        MatIconModule,
        SucheEmailModule,
        SucheGeschlechtModule,
        SucheInteressenModule,
        MatButtonModule,
    ],
})
export class SuchformularModule {}
