import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListComponent} from './pages/list/list.component';
import {AddComponent} from './pages/add/add.component';
import {MaterialModule} from "../material/material.module";
import {ConfirmComponent} from './components/confirm/confirm.component';
import {StoreRoutingModule} from "./store-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreRoutingModule,
    MaterialModule
  ]
})
export class StoreModule {
}
