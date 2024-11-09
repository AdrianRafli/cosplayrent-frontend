import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokoProductTambahPage } from './toko-product-tambah.page';

const routes: Routes = [
  {
    path: '',
    component: TokoProductTambahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokoProductTambahPageRoutingModule {}
