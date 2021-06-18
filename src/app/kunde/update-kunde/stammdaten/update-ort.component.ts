import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-ort</code>
 */
@Component({
    selector: 'hs-update-ort',
    templateUrl: './update-ort.component.html',
    styleUrls: ['./update-ort.component.css'],
})
export class UpdateOrtComponent implements OnInit {
    // <hs-update-plz [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string | undefined;

    ort!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateOrtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.ort = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(/^\w.*$/u),
        ]);
        this.form.addControl('ort', this.ort);
    }
}
