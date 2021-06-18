import { CommonModule } from '@angular/common';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateGeschlechtComponent],
    exports: [CreateGeschlechtComponent],
    // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
    imports: [ReactiveFormsModule, MatRadioModule, CommonModule],
})
export class CreateGeschlechtModule {}
