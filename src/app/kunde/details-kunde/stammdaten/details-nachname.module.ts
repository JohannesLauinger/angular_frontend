import { CommonModule } from '@angular/common';
import { DetailsNachnameComponent } from './details-nachname.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsNachnameComponent],
    exports: [DetailsNachnameComponent],
    imports: [CommonModule, MatGridListModule],
})
export class DetailsNachnameModule {}
