import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahSandiPage } from './ubah-sandi.page';

const routes: Routes = [
  {
    path: '',
    component: UbahSandiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahSandiPageRoutingModule {}
