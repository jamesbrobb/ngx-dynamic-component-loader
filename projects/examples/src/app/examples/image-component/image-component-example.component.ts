import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {FALLBACK_COLORS, ImageComponentModule} from "@jamesbenrobb/product";



@Component({
  selector: 'image-component-example',
  template: `
    <image-component class="image"
       [ngClass]="selectedSize"
       [url]="url"
       [fallbackSeed]="fallbackSeed"
       [fallbackColor]="fallbackColor"
       [blur]="blur">
    </image-component>
  `,
  styleUrls: ['./image-component-example.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    ImageComponentModule
  ]
})
export class ImageComponentExampleComponent {

  @Input() url?: string;
  @Input() fallbackSeed = '1';
  @Input() fallbackColor: FALLBACK_COLORS = FALLBACK_COLORS.BLUE;
  @Input() blur: boolean = false;

  @Input() selectedSize: string = 'default';
}
