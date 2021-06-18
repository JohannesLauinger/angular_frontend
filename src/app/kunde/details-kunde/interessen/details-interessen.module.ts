import { CommonModule } from '@angular/common';
import { DetailsInteressenComponent } from './details-interessen.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsInteressenComponent],
    exports: [DetailsInteressenComponent],
    imports: [CommonModule],
})
export class DetailsInteressenModule {}
