import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-plz</code>
 */
@Component({
    selector: 'hs-update-plz',
    templateUrl: './update-plz.component.html',
    styleUrls: ['./update-plz.component.css'],
})
export class UpdatePlzComponent implements OnInit {
    // <hs-update-plz [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string | undefined;

    plz!: FormControl;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly LENGTH = 5;

    ngOnInit() {
        console.log(
            'UpdatePlzComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.plz = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(this.LENGTH),
            Validators.maxLength(this.LENGTH),
        ]);
        this.form.addControl('plz', this.plz);
    }
}
