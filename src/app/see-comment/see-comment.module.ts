import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeCommentPageRoutingModule } from './see-comment-routing.module';

import { SeeCommentPage } from './see-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeCommentPageRoutingModule
  ],
  declarations: [SeeCommentPage]
})
export class SeeCommentPageModule {}
