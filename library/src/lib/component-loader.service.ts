import {createNgModule, Injector, NgModuleRef, Type} from "@angular/core";
import {StringUtils} from "@jamesbenrobb/core";


type ComponentImportFunc = () => Promise<any>


export type ComponentLoaderConfig = {
  componentName?: string
  ngModuleName?: string
  import: ComponentImportFunc
}

export type ComponentLoaderMap = {
  [selectorOrName: string]: ComponentImportFunc | ComponentLoaderConfig
}

export type ComponentLoaderReturnType<T> = {
  ngModuleRef?: NgModuleRef<unknown>,
  componentType?: Type<T>
}


export class ComponentLoaderService {

  readonly #componentMap?: ComponentLoaderMap[];
  readonly #injector: Injector;

  constructor(injector: Injector, componentMap?: ComponentLoaderMap) {
    this.#injector = injector;
    this.#componentMap = componentMap ? Array.isArray(componentMap) ? componentMap : [componentMap] : undefined;
  }

  async getComponent<T = unknown>(type: string): Promise<ComponentLoaderReturnType<T> | undefined> {

    let compDef: (() => any) | ComponentLoaderConfig | undefined;

    if(!this.#componentMap) {
      console.warn('no ComponentLoaderMap provided');
      return;
    }

    this.#componentMap.forEach((map) => {

      if(!map[type]) {
        return;
      }

      compDef = map[type];
    });

    if(!compDef) {
      console.warn(`no component registered for the selector ${type}`);
      return;
    }

    const config: Required<ComponentLoaderConfig> = {
        import:  typeof compDef === 'function' ? compDef : compDef.import,
        componentName: `${StringUtils.toPascalCase(type as string)}Component`,
        ngModuleName: `${StringUtils.toPascalCase(type as string)}ComponentModule`,
        ...typeof compDef === 'function' ? {} : compDef
      },
      module: Record<string, Type<T>> = await config.import(),
      componentType: Type<T> | undefined = module[config.componentName],
      moduleType: Type<T> | undefined = module[config.ngModuleName];

    if(!componentType) {
      console.warn(`no component found in module for selector ${type}, expected ${config.componentName}`);
    }

    let ngModuleRef: NgModuleRef<unknown> | undefined;

    if(moduleType) {
      ngModuleRef = createNgModule(moduleType, this.#injector);
    }

    return {
      componentType,
      ngModuleRef
    }
  }
}
