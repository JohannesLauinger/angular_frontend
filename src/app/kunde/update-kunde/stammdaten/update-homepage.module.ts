import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateHomepageComponent } from './update-homepage.component';

@NgModule({
    declarations: [UpdateHomepageComponent],
    exports: [UpdateHomepageComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class UpdateHomepageModule {}
