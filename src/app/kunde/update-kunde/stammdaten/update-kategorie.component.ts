import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-kategorie</code>
 */
@Component({
    selector: 'hs-update-kategorie',
    templateUrl: './update-kategorie.component.html',
    styleUrls: ['./update-kategorie.component.css'],
})
export class UpdateKategorieComponent implements OnInit {
    // <hs-update-kategorie [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue: number | undefined;

    kategorie!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateKategorieComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.kategorie = new FormControl(this.currentValue);
        this.form.addControl('kategorie', this.kategorie);
    }
}
