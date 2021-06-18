import { CommonModule } from '@angular/common';
import { CreateAdresseModule } from './create-adresse.module';
import { CreateEmailModule } from './create-email.module';
import { CreateFamilienstandModule } from './create-familienstand.module';
import { CreateGeburtsdatumModule } from './create-geburtsdatum.module';
import { CreateGeschlechtModule } from './create-geschlecht.module';
import { CreateHomepageModule } from './create-homepage.module';
import { CreateInteressenModule } from './create-interessen.module';
import { CreateKategorieModule } from './create-kategorie.module';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameModule } from './create-nachname.module';
import { CreateNewsletterModule } from './create-newsletter.module';
import { CreateUserModule } from './create-user.module';
// import { ErrorMessageModule } from '../../shared/error-message.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        CreateNachnameModule,
        CreateEmailModule,
        CreateKategorieModule,
        CreateNewsletterModule,
        CreateGeburtsdatumModule,
        CreateGeschlechtModule,
        CreateInteressenModule,
        CreateFamilienstandModule,
        CreateUserModule,
        CreateHomepageModule,
        MatButtonModule,
        MatIconModule,
        // ErrorMsgModule,
        CreateAdresseModule,
    ],
    // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
    providers: [Title, MatDatepickerModule, MatNativeDateModule],
})
export class CreateKundeModule {}
