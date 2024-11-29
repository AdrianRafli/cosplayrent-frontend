import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeCommentPage } from './see-comment.page';

const routes: Routes = [
  {
    path: '',
    component: SeeCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeCommentPageRoutingModule {}
