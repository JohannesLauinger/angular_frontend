import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
    styleUrls: ['./create-geschlecht.component.css'],
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    readonly geschlecht = new FormControl('WEIBLICH');

    ngOnInit() {
        console.log('CreateGeschlecht.ngOnInit');
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
