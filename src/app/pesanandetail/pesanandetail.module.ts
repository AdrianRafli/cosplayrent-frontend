import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesanandetailPageRoutingModule } from './pesanandetail-routing.module';

import { PesanandetailPage } from './pesanandetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesanandetailPageRoutingModule
  ],
  declarations: [PesanandetailPage]
})
export class PesanandetailPageModule {}
