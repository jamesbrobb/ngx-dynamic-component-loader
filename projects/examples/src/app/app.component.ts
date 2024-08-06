import { Component } from '@angular/core';
import {ComponentLoaderDirective, ComponentLoaderIODirective} from "ngx-dynamic-component-loader";
import {componentMap} from "./examples/example.providers";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ComponentLoaderIODirective,
    FormsModule,
    ComponentLoaderDirective,
    NgForOf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly components = Object.keys(componentMap);

  selectedComponent: string = this.components[0];
}
