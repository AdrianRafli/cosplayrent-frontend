import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderdetailPageRoutingModule } from './orderdetail-routing.module';

import { OrderdetailPage } from './orderdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderdetailPageRoutingModule
  ],
  declarations: [OrderdetailPage]
})
export class OrderdetailPageModule {}
