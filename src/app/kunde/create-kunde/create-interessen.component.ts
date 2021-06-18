import { Component, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-create-interessen',
    templateUrl: './create-interessen.component.html',
    styleUrls: ['./create-interessen.component.css'],
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    public form!: FormGroup;

    readonly reisen = new FormControl(false);

    readonly lesen = new FormControl(false);

    readonly sport = new FormControl(false);

    ngOnInit() {
        console.log('CreateInteressenComponent.ngOnInit');

        this.form.addControl('reisen', this.reisen);
        this.form.addControl('lesen', this.lesen);
        this.form.addControl('sport', this.sport);
    }
}
