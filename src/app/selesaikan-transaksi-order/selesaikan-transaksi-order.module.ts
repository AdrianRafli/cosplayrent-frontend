import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelesaikanTransaksiOrderPageRoutingModule } from './selesaikan-transaksi-order-routing.module';

import { SelesaikanTransaksiOrderPage } from './selesaikan-transaksi-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelesaikanTransaksiOrderPageRoutingModule
  ],
  declarations: [SelesaikanTransaksiOrderPage]
})
export class SelesaikanTransaksiOrderPageModule {}
