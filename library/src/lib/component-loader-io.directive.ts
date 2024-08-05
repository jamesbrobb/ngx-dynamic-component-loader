import {DestroyRef, Directive, EventEmitter, inject, Input, Output, SimpleChanges} from "@angular/core";
import {ComponentLoaderDirective} from "./component-loader.directive";
import {ComponentLoaderIOBase} from "./component-loader-io-base.abstract";


@Directive({
  selector: '[componentLoaderIO]',
  standalone: true,
  hostDirectives: [{
    directive: ComponentLoaderDirective,
    inputs: ['componentLoader:componentLoaderIO'],
    outputs: ['componentLoaded', 'componentChanged']
  }]
})
export class ComponentLoaderIODirective<T extends object> extends ComponentLoaderIOBase<T> {

  @Input() inputs?: Partial<T>;
  @Input() outputs?: Partial<T>;

  @Output() outputChange = new EventEmitter();

  #destroyRef = inject(DestroyRef);

  protected override setUpInstance(): void {

    if(!this.instance) {
      return;
    }

    // loop through outputs to add handlers?

    /*this.instance.dataChange
      .pipe(
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((arg) => this.dataChange.emit(arg));*/
  }

  protected updateInstanceInputs(changes: SimpleChanges): void {

    Object.keys(this.inputs || {})
        .forEach((key) => {

          if(!this.instance || !this.inputs) {
            return;
          }

          this.instance.setInput(key, this.inputs[key as keyof T]);
        });
  }

  protected cleanUpInstance(): void {

  }
}
