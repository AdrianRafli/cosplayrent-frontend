import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationcodePage } from './verificationcode.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationcodePageRoutingModule {}
