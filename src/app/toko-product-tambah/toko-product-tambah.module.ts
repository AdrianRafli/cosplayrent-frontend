import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokoProductTambahPageRoutingModule } from './toko-product-tambah-routing.module';

import { TokoProductTambahPage } from './toko-product-tambah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokoProductTambahPageRoutingModule
  ],
  declarations: [TokoProductTambahPage]
})
export class TokoProductTambahPageModule {}
