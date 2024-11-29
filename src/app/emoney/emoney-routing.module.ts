import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmoneyPage } from './emoney.page';

const routes: Routes = [
  {
    path: '',
    component: EmoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmoneyPageRoutingModule {}
