// import { BalkendiagrammModule } from './diagramme/balkendiagramm.module';
import { CreateKundeModule } from './create-kunde/create-kunde.module';
import { DetailsKundeModule } from './details-kunde/details-kunde.module';
import { KundeRoutingModule } from './kunde-routing.module';
// import { LiniendiagrammModule } from './diagramme/liniendiagramm.module';
import { NgModule } from '@angular/core';
import { SucheKundenModule } from './suche-kunden/suche-kunden.module';
// import { TortendiagrammModule } from './diagramme/tortendiagramm.module';
import { UpdateKundeModule } from './update-kunde/update-kunde.module';

@NgModule({
    imports: [
        // eslint-disable-next-line @angular-eslint/sort-ngmodule-metadata-arrays
        SucheKundenModule,
        KundeRoutingModule,
        CreateKundeModule,
        DetailsKundeModule,
        UpdateKundeModule,
        // TortendiagrammModule,
        // LiniendiagrammModule,
        // BalkendiagrammModule,
    ],
})
export class KundeModule {}
