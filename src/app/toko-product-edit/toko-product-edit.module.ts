import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokoProductEditPageRoutingModule } from './toko-product-edit-routing.module';

import { TokoProductEditPage } from './toko-product-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokoProductEditPageRoutingModule
  ],
  declarations: [TokoProductEditPage]
})
export class TokoProductEditPageModule {}
