import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesanandetailPage } from './pesanandetail.page';

const routes: Routes = [
  {
    path: '',
    component: PesanandetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesanandetailPageRoutingModule {}
