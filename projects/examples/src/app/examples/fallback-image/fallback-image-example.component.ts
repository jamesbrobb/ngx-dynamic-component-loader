import {Component, Input} from '@angular/core';
import {FALLBACK_COLORS} from "@jamesbenrobb/product";
import {FallbackImageComponentModule} from "@jamesbenrobb/product";


@Component({
  selector: 'fallback-image-example',
  template: `
  <fallback-image
    [seed]="seed"
    [color]="color">
  </fallback-image>
  `,
  styleUrls: ['./fallback-image-example.component.scss'],
  standalone: true,
  imports: [
    FallbackImageComponentModule
  ]
})
export class FallbackImageExampleComponent {
  @Input() seed = '1';
  @Input() color: FALLBACK_COLORS = FALLBACK_COLORS.WHITE;
}
