import {createNgModule, Injector, NgModuleRef, Type} from "@angular/core";
import {StringUtils} from "@jamesbenrobb/core";


type ComponentImportFunc = () => Promise<any>


export type ComponentLoaderConfig = {
  standalone?: boolean
  componentName?: string
  ngModuleName?: string
  isDefaultExport?: boolean
  import: ComponentImportFunc
}

export type ComponentLoaderMap = {
  [selectorOrName: string]: ComponentImportFunc | ComponentLoaderConfig
}

export type ComponentLoaderReturnType<T> = {
  ngModuleRef: NgModuleRef<unknown> | undefined,
  componentType: Type<T>
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

    let config: Required<ComponentLoaderConfig> = {
        import:  typeof compDef === 'function' ? compDef : compDef.import,
        standalone: true,
        componentName: `${StringUtils.toPascalCase(type as string)}Component`,
        ngModuleName: `${StringUtils.toPascalCase(type as string)}ComponentModule`,
        isDefaultExport: false,
        ...typeof compDef === 'function' ? {} : compDef
      },
      componentType: Type<T>,
      moduleType: Type<T> | undefined,
      ngModuleRef: NgModuleRef<unknown> | undefined;

    const module: Record<string, Type<T>> = await config.import();

    if(config.standalone) {

      componentType = config.isDefaultExport ? module['default'] : module[config.componentName];

    } else {

      componentType = module[config.componentName];
      moduleType = config.isDefaultExport ? module['default'] : module[config.ngModuleName];
      ngModuleRef = createNgModule(moduleType, this.#injector);
    }

    return {
      componentType,
      ngModuleRef
    }
  }
}
