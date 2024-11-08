import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokoProdukPage } from './toko-produk.page';

const routes: Routes = [
  {
    path: '',
    component: TokoProdukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokoProdukPageRoutingModule {}
