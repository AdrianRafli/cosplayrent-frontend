import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileChangePage } from './profile-change.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileChangePageRoutingModule {}
