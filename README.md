# Ngx Dynamic Component Loader

A collection of directives and services to facilitate the dynamic loading of Angular components.

---

To use the component loader directive do the following:

1) [Provide a value for the `ComponentLoaderMapService` injection token](#1)
2) [Provide the `ComponentLoaderService` in the root of your application](#2)
3) [Add either the `componentLoader` or `componentLoaderIO` directive](#3)

---

```ts
export type ComponentLoaderMap = {
  [selectorOrName: string]: ComponentImportFunc | ComponentLoaderConfig
}

export type ComponentImportFunc = () => Promise<any>

export type ComponentLoaderConfig = {
  componentName?: string
  ngModuleName?: string
  import: ComponentImportFunc
}
```

The default values for each `ComponentLoaderConfig` are as follows:

```ts
const map: ComponentLoaderMap = {
  'my-component': {
    componentName: `${selectorOrName}Component`,
    ngModuleName: `${selectorOrName}ModuleComponent`
  }
}
```

Steps:

1. The supplied import function is called
2. If successful a [Module namespace object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object) is loaded
3. The value of `componentName` is used to retrieve the component type from the Module namespace object
4. The value of `ngModuleName` is used to retrieve the ngModule type from the Module namespace object



# 1.

**Provide a value for the `ComponentLoaderMapService` injection token**

Define a [ContentLoaderMap](https://github.com/jamesbrobb/ngx-dynamic-component-loader/tree/main/library/src/lib/component-loader/component-loader.service.ts#L16) for the `ComponentLoaderMapService` provider.



The map defines a key value pair for each component with a value of type [ComponentLoaderConfig](https://github.com/jamesbrobb/ngx-dynamic-component-loader/tree/main/library/src/lib/component-loader/component-loader.service.ts#L8).

```ts
[{
  provide: ComponentLoaderMapService,
  useValue: {
    /*  
        Loads either:
          - A component of class MyStandaloneComponent
        Or
          - A SCAM pattern with ngModule class MyStandaloneComponentModule and component of class MyStandaloneComponent
     */
    'my-standalone': import('./path/to/my-standalone.component'),
    /*
        If a different key name to the component class name is required, the component name can be explicitly defined.
     */
    'some-other-component': {
      import:() => import('./path/to/my-actual.component'),
      componentName: 'MyActualComponent'
    },
    /*
        For non standalone components that do not follow the SCAM pattern
        an explicit module name can be defined.
     */
    'non-scam-non-standalone-component': {
      import:() => import('./path/to/non-scam-non-standalone.component'),
      ngModuleName: 'SomeOtherModule'
    },
    /*
      If the component is a default export
     */
    'component-is-default-export': {
      import:() => import('./path/to/component'),
      componentName: 'default'
    },
    /*
      If the ngModule is the default export
     */
    'ng-module-is-default-export': {
      import:() => import('./path/to/none-standalone-component'),
      ngModuleName: 'default'
    },
  },
  multi: true
}]
```

# 2.

**Provide the `ComponentLoaderService` in the root of your application**

```ts
[{
  provide: ComponentLoaderService,
    useFactory: (inj: Injector, map: ComponentLoaderMap) => {
    return new ComponentLoaderService(inj, map);
  },
    deps: [
    Injector,
    ComponentLoaderMapService
  ]
}]
```


# 3.

**Add either the `componentLoader` or `componentLoaderIO` directive on an `ng-container` within your markup and add the directive to your `imports` metadata**

To use the standard component loader directive:

```html
<ng-container componentLoader="{{componentKeyToLoad}}"></ng-container>
```

or the component loader IO directive:

```html
<ng-container componentLoaderIO="{{componentKeyToLoad}}" [inputs]="inputsObject"></ng-container>
```

Where `inputsObject` is an object containing key value pairs where the key matches the name
of the input and the value equals the input value type.

