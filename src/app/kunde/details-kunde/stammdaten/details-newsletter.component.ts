import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-newsletter</code>
 */
@Component({
    selector: 'hs-details-newsletter',
    templateUrl: './details-newsletter.component.html',
    styleUrls: ['./details-newsletter.component.css'],
})
export class DetailsNewsletterComponent implements OnInit {
    @Input()
    newsletter: boolean | undefined;

    ngOnInit() {
        console.log(`DetailsNewsletterComponent.newsletter=${this.newsletter}`);
    }
}
