import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmoneyPageRoutingModule } from './emoney-routing.module';

import { EmoneyPage } from './emoney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmoneyPageRoutingModule
  ],
  declarations: [EmoneyPage]
})
export class EmoneyPageModule {}
