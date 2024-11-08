import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokoProdukPageRoutingModule } from './toko-produk-routing.module';

import { TokoProdukPage } from './toko-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokoProdukPageRoutingModule
  ],
  declarations: [TokoProdukPage]
})
export class TokoProdukPageModule {}
