import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-adresse',
    templateUrl: './create-adresse.component.html',
})
export class CreateAdresseComponent implements OnInit {
    private static readonly LENGTH = 5;

    @Input()
    form!: FormGroup;

    readonly ort = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\w.*$/u),
    ]);

    readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateAdresseComponent.LENGTH),
        Validators.maxLength(CreateAdresseComponent.LENGTH),
    ]);

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit');

        this.form.addControl('ort', this.ort);
        this.form.addControl('plz', this.plz);
    }
}
