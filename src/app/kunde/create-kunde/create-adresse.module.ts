import { CommonModule } from '@angular/common';
import { CreateAdresseComponent } from './create-adresse.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateAdresseComponent],
    exports: [CreateAdresseComponent],
    imports: [
        CommonModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class CreateAdresseModule {}
