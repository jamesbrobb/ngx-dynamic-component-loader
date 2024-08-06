import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMap, ComponentLoaderMapService} from "ngx-dynamic-component-loader";


export const componentMap: ComponentLoaderMap = {
  'color-overlay-example': () => import('./color-overlay/color-overlay-example.component'),
  'grid-layout-example': () => import('./grid-layout/grid-layout-example.component'),
  'responsive-container-example': () => import('./responsive-container/responsive-container-example.component'),
  'flex-grid-example': {
    import: () => import('./flex-grid/flex-grid-example.component'),
    ngModuleName: 'default'
  },
  'page-header-example': () => import('./page-header/page-header-example.component'),
  'my-library-lesson-plan-card-example': () => import('./my-library-lesson-plan-card/my-library-lesson-plan-card-example.component'),
  'fallback-image-example': () => import('./fallback-image/fallback-image-example.component'),
  'image-example': {
    import: () => import('./image-component/image-component-example.component'),
    componentName: 'ImageComponentExampleComponent'
  },
  'lesson-plan-card-example': () => import('./lesson-plan/card/lesson-plan-card-example.component'),
  'lesson-plan-grid-example': () => import('./lesson-plan/grid/lesson-plan-grid-example.component'),
  'lesson-plan-header-example': () => import('./lesson-plan/header/lesson-plan-header-example.component'),
  'lesson-plan-hero-example': () => import('./lesson-plan/hero/lesson-plan-hero-example.component'),
  'lesson-plan-vocabulary-example': () => import('./lesson-plan/vocabulary/lesson-plan-vocabulary-example.component'),
}


export function getExampleProvider(): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: componentMap,
    multi: true
  }]);
}
