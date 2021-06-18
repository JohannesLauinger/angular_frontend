import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { SucheInteressenComponent } from './suche-interessen.component';

@NgModule({
    declarations: [SucheInteressenComponent],
    exports: [SucheInteressenComponent],
    imports: [FormsModule, MatCheckboxModule],
})
export class SucheInteressenModule {}
