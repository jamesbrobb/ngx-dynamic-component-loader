import {Component, Input} from "@angular/core";
import {OVERLAY_COLORS, ColorOverlayComponentModule} from "@jamesbenrobb/product";

// THIS CODE IS GENERATED - DO NOT EDIT
@Component({
  selector: 'color-overlay-example',
  standalone: true,
  imports: [
    ColorOverlayComponentModule
  ],
  template:`
    <color-overlay
      [color]="color"
      [allowTransition]="allowTransition" >
    </color-overlay>
  `,
  styleUrls: ['./color-overlay-example.component.scss']
})
export class ColorOverlayExampleComponent {

  @Input() color?: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
  @Input() allowTransition: boolean = true;
}
