import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilChangePage } from './profil-change.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilChangePageRoutingModule {}
