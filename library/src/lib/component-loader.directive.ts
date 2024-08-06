import {
  ComponentRef,
  Directive, EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy, Output,
  ViewContainerRef
} from "@angular/core";

import {ComponentLoaderService} from "./component-loader.service";


@Directive({
  selector: '[componentLoader]',
  standalone: true
})
export class ComponentLoaderDirective<T> implements OnChanges, OnDestroy {

  @Input('componentLoader') componentType?: string;

  @Output() componentLoaded = new EventEmitter<{success: boolean, type: string}>();
  @Output() componentChanged = new EventEmitter<ComponentRef<T>>();

  #container = inject(ViewContainerRef);
  #injector = inject(Injector);
  #loaderService = inject(ComponentLoaderService);

  #currentComponentType?: string;
  #currentComponent?: ComponentRef<T>;

  ngOnChanges(): void {
    this.loadComponent();
  }

  async loadComponent(componentType?: string): Promise<boolean> {

    if(componentType) {
      this.componentType = componentType;
    }

    const success = await this.#load();

    this.componentLoaded.emit({success, type: this.componentType!});

    return success;
  }

  ngOnDestroy() {
    this.#cleanUp();
  }

  async #load(): Promise<boolean> {

    if(!this.componentType || this.componentType === this.#currentComponentType) {
      return false;
    }

    this.#cleanUp();

    return this.#createComponent(this.componentType);
  }

  #cleanUp() {

    if(!this.#currentComponent) {
      return;
    }

    this.#container.clear();
    this.#currentComponent.destroy();
    this.#currentComponent = undefined;
    this.#currentComponentType = undefined;
  }

  async #createComponent(type: string): Promise<boolean> {

    const result = await this.#loaderService.getComponent<T>(type);

    if(!result) {
      return false;
    }

    const {componentType, ngModuleRef} = result;

    if (!componentType) {
      return false;
    }

    this.#currentComponent = this.#container.createComponent<T>(componentType, {injector:this.#injector, ngModuleRef:ngModuleRef});
    this.#currentComponentType = type;

    this.componentChanged.emit(this.#currentComponent);

    return true;
  }
}
