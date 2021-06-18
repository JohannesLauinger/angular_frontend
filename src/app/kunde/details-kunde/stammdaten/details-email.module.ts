import { CommonModule } from '@angular/common';
import { DetailsEmailComponent } from './details-email.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsEmailComponent],
    exports: [DetailsEmailComponent],
    imports: [CommonModule, MatGridListModule],
})
export class DetailsEmailModule {}
