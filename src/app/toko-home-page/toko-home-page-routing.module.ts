import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokoHomePagePage } from './toko-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: TokoHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokoHomePagePageRoutingModule {}
