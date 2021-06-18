import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../shared/error-message.module';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UpdateInteressenModule } from './interessen/update-interessen.module';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateStammdatenModule } from './stammdaten/update-stammdaten.module';

@NgModule({
    declarations: [UpdateKundeComponent],
    exports: [UpdateKundeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ErrorMessageModule,
        MatToolbarModule,
        MatTabsModule,
        UpdateInteressenModule,
        UpdateStammdatenModule,
    ],
    providers: [Title],
})
export class UpdateKundeModule {}
