// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { CreateKundeGuard } from './create-kunde/create-kunde.guard';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { NgModule } from '@angular/core';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';
// Route-Definitionen fuer das Feature-Modul "kunde"
// Zuordnung von Pfaden und Komponent mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
    {
        path: 'create',
        component: CreateKundeComponent,
        canActivate: [AdminGuard],
        canDeactivate: [CreateKundeGuard],
    },
    // {
    //     path: 'balkendiagramm',
    //     component: BalkendiagrammComponent,
    //     canActivate: [AdminGuard],
    // },
    // {
    //     path: 'liniendiagramm',
    //     component: LiniendiagrammComponent,
    //     canActivate: [AdminGuard],
    // },
    // {
    //     path: 'tortendiagramm',
    //     component: TortendiagrammComponent,
    //     canActivate: [AdminGuard],
    // },

    {
        path: ':id',
        component: DetailsKundeComponent,
    },
    {
        path: ':id/update',
        component: UpdateKundeComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class KundeRoutingModule {}
