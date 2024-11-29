import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PembayaranStatusPageRoutingModule } from './pembayaran-status-routing.module';

import { PembayaranStatusPage } from './pembayaran-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PembayaranStatusPageRoutingModule
  ],
  declarations: [PembayaranStatusPage]
})
export class PembayaranStatusPageModule {}
