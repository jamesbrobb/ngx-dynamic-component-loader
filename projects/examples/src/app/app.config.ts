import { ApplicationConfig } from '@angular/core';
import {getExampleProvider} from "./examples/example.providers";
import {getComponentLoaderProviders} from "ngx-dynamic-component-loader";


export const appConfig: ApplicationConfig = {
  providers: [
    getComponentLoaderProviders(),
    getExampleProvider()
  ]
};
