import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewHistoryPageRoutingModule } from './review-history-routing.module';

import { ReviewHistoryPage } from './review-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewHistoryPageRoutingModule
  ],
  declarations: [ReviewHistoryPage]
})
export class ReviewHistoryPageModule {}
