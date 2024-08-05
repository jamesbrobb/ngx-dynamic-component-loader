# Ngx Dynamic Component Loader

A collection of directives and services to facilitate the dynamic loading of Angular components.

---

To use the component loader directive do the following:

1) [Provide a value for the `ComponentLoaderMapService` injection token](#1)
2) [Provide the `ComponentLoaderService` in the root of your application](#2)
3) [Add either the `componentLoader` or `componentLoaderIO` directive](#3)

---

# 1.

**Provide a value for the `ComponentLoaderMapService` injection token**

Define a [ContentLoaderMap](https://github.com/jamesbrobb/jbr/blob/main/libraries/ui/src/lib/component-loader/component-loader.service.ts#L16) for the `ComponentLoaderMapService` provider.

The map defines a key value pair for each component with a value of type [ComponentLoaderConfig](https://github.com/jamesbrobb/jbr/blob/main/libraries/ui/src/lib/component-loader/component-loader.service.ts#L8).

```ts
[{
  provide: ComponentLoaderMapService,
  useValue: {
    /*  
        By default it's assumed that the component to load is
        
        a) standalone: true
        b) The class name of the component to load (which is required to access the component once it's loaded)
        follows the convention `<key>Component`
        
        So in the below example the component class name would be `MyStandaloneComponent` and the
        key is the kebab-case version of the class name `my-standalone` minus 'Component'. 
     */
    'my-standalone': import('./path/to/my-standalone.component'),
    /*
        If a different key name to the component class name is required, the component name can be explicitly defined.
     */
    'some-other-standalone-component': {
      import:() => import('./path/to/my-actual.component'),
      standalone: true,
      componentName: 'MyActualComponent'
    },
    /*
        Unless explicitly specified, when loading a non standalone component it's assumed that a
        Single Component Angular Module (SCAM pattern) is being used, whereby the module name
        matches the component name ending in 'Module'.
        
        i.e. `NonStandaloneComponent` -> `NonStandaloneComponentModule`
     */
    'non-standalone': {
      import:() => import('./path/to/none-standalone.component'),
      standalone: false
    },
    /*
        For non standalone components that do not follow the SCAM pattern
        an explicit module name can be defined.
     */
    'non-scam-non-standalone-component': {
      import:() => import('./path/to/non-scam-non-standalone.component'),
      standalone: false,
      ngModuleName: 'SomeOtherModule'
    },
    /*
        The final option is for when a component class has been set as a default export.
     */
    'non-standalone-component-as-default-export': {
      import:() => import('./path/to/none-standalone-component'),
      standalone: false,
      isDefaultExport: true
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

