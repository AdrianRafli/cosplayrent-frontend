import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupPaymentPageRoutingModule } from './topup-payment-routing.module';

import { TopupPaymentPage } from './topup-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupPaymentPageRoutingModule
  ],
  declarations: [TopupPaymentPage]
})
export class TopupPaymentPageModule {}
