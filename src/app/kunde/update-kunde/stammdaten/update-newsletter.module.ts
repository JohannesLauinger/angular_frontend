import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateNewsletterComponent } from './update-newsletter.component';

@NgModule({
    declarations: [UpdateNewsletterComponent],
    exports: [UpdateNewsletterComponent],
    imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
})
export class UpdateNewsletterModule {}
