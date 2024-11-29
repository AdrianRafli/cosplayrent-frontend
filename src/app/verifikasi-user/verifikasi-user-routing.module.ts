import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifikasiUserPage } from './verifikasi-user.page';

const routes: Routes = [
  {
    path: '',
    component: VerifikasiUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifikasiUserPageRoutingModule {}
