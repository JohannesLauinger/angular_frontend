import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-user',
    templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {
    @Input()
    form!: FormGroup;

    readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\w*/u),
    ]);

    readonly password = new FormControl(undefined, Validators.required);

    ngOnInit() {
        console.log('CreateUserComponent.ngOnInit');

        this.form.addControl('username', this.username);
        this.form.addControl('password', this.password);
    }
}
