import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
    styleUrls: ['./create-geburtsdatum.component.css'],
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    form!: FormGroup;

    readonly geburtsdatum = new FormControl(undefined);

    ngOnInit() {
        console.log('CreateGeburtsdatumComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
