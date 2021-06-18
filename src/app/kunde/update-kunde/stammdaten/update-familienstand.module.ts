import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateFamilienstandComponent } from './update-familienstand.component';

@NgModule({
    declarations: [UpdateFamilienstandComponent],
    exports: [UpdateFamilienstandComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
})
export class UpdateFamilienstandModule {}
