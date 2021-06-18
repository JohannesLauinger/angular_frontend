import { CommonModule } from '@angular/common';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsNewsletterComponent],
    exports: [DetailsNewsletterComponent],
    imports: [CommonModule, MatIconModule],
})
export class DetailsNewsletterModule {}
