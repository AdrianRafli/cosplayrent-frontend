import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmoneyHistoryPageRoutingModule } from './emoney-history-routing.module';

import { EmoneyHistoryPage } from './emoney-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmoneyHistoryPageRoutingModule
  ],
  declarations: [EmoneyHistoryPage]
})
export class EmoneyHistoryPageModule {}
