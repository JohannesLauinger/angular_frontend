import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-kategorie',
    templateUrl: './details-kategorie.component.html',
    styleUrls: ['./details-kategorie.component.css'],
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    kategorieArray!: boolean[];

    ngOnInit() {
        console.log(
            'DetailsKategorieComponent.kategorieArray=',
            this.kategorieArray,
        );
    }
}
