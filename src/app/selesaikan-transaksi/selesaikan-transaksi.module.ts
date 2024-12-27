import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelesaikanTransaksiPageRoutingModule } from './selesaikan-transaksi-routing.module';

import { SelesaikanTransaksiPage } from './selesaikan-transaksi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelesaikanTransaksiPageRoutingModule
  ],
  declarations: [SelesaikanTransaksiPage]
})
export class SelesaikanTransaksiPageModule {}
