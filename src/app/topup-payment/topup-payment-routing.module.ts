import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupPaymentPage } from './topup-payment.page';

const routes: Routes = [
  {
    path: '',
    component: TopupPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupPaymentPageRoutingModule {}
