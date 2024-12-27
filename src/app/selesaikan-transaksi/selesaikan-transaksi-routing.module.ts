import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelesaikanTransaksiPage } from './selesaikan-transaksi.page';

const routes: Routes = [
  {
    path: '',
    component: SelesaikanTransaksiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelesaikanTransaksiPageRoutingModule {}
