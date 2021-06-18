import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-titel</code>
 */
@Component({
    selector: 'hs-details-email',
    templateUrl: './details-email.component.html',
    styleUrls: ['./details-email.component.css'],
})
export class DetailsEmailComponent implements OnInit {
    @Input()
    email: string | undefined;

    ngOnInit() {
        console.log(`DetailsEmailComponent.email=${this.email}`);
    }
}
