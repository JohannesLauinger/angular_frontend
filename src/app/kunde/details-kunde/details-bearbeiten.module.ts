import { CommonModule } from '@angular/common';
import { DetailsBearbeitenComponent } from './details-bearbeiten.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DetailsBearbeitenComponent],
    exports: [DetailsBearbeitenComponent],
    imports: [CommonModule, RouterModule],
})
export class DetailsBearbeitenModule {}
