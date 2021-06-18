import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-homepage</code>
 */
@Component({
    selector: 'hs-details-homepage',
    templateUrl: './details-homepage.component.html',
    styleUrls: ['./details-homepage.component.css'],
})
export class DetailsHomepageComponent implements OnInit {
    @Input()
    homepage: string | undefined;

    ngOnInit() {
        console.log(`DetailsEmailComponent.homepage=${this.homepage}`);
    }
}
