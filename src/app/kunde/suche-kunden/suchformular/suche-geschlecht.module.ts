import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';

@NgModule({
    declarations: [SucheGeschlechtComponent],
    exports: [SucheGeschlechtComponent],
    imports: [FormsModule, MatRadioModule],
})
export class SucheGeschlechtModule {}
