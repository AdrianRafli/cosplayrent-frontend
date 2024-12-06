import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderdetailPage } from './orderdetail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderdetailPageRoutingModule {}
