import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateGeschlechtComponent } from './update-geschlecht.component';

@NgModule({
    declarations: [UpdateGeschlechtComponent],
    exports: [UpdateGeschlechtComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
})
export class UpdateGeschlechtModule {}
