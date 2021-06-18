import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-interessen',
    templateUrl: './details-interessen.component.html',
    styleUrls: ['./details-interessen.component.css'],
})
export class DetailsInteressenComponent implements OnInit {
    @Input()
    readonly values!: string[];

    ngOnInit() {
        console.log('DetailsInteressenComponent.values=', this.values);
    }
}
