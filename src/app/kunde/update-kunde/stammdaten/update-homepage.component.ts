import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-homepage</code>
 */
@Component({
    selector: 'hs-update-homepage',
    templateUrl: './update-homepage.component.html',
    styleUrls: ['./update-homepage.component.css'],
})
export class UpdateHomepageComponent implements OnInit {
    // <hs-update-hoempage [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string | undefined;

    homepage!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateHomepageComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.homepage = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(
                // eslint-disable-next-line max-len
                /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/u,
            ),
        ]);
        this.form.addControl('homepage', this.homepage);
    }
}
