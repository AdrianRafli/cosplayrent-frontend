import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokoProductEditPage } from './toko-product-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TokoProductEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokoProductEditPageRoutingModule {}
