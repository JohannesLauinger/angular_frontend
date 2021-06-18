import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
    styleUrls: ['./create-familienstand.component.css'],
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    form!: FormGroup;

    readonly familienstand = new FormControl(undefined, Validators.required);

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit');
        this.form.addControl('familienstand', this.familienstand);
    }
}
