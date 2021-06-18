import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormControl, FormGroup } from '@angular/forms';

import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
})
export class CreateHomepageComponent implements OnInit {
    @Input()
    form!: FormGroup;

    // // eslint-disable-next-line array-bracket-newline
    readonly homepage = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(
            // eslint-disable-next-line max-len
            /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/u,
        ),
        // // eslint-disable-next-line array-bracket-newline
    ]);

    ngOnInit() {
        console.log('CreateHomepageComponent.ngOnInit');

        this.form.addControl('homepage', this.homepage);
    }
}
