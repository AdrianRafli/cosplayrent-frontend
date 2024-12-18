import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoriPageRoutingModule } from './order-histori-routing.module';

import { OrderHistoriPage } from './order-histori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoriPageRoutingModule
  ],
  declarations: [OrderHistoriPage]
})
export class OrderHistoriPageModule {}
