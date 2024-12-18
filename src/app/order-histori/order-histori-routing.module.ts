import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoriPage } from './order-histori.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHistoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHistoriPageRoutingModule {}
