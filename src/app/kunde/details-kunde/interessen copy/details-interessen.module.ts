import { CommonModule } from '@angular/common';
import { DetailsInteressenComponent } from './details-interessen.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsInteressenComponent],
    exports: [DetailsInteressenComponent],
    imports: [CommonModule, MatIconModule],
})
export class DetailsInteressenModule {}
