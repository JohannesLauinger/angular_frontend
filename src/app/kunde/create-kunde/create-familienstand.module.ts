import { CommonModule } from '@angular/common';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateFamilienstandComponent],
    exports: [CreateFamilienstandComponent],
    imports: [
        CommonModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
})
export class CreateFamilienstandModule {}
