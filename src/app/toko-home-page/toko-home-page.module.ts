import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokoHomePagePageRoutingModule } from './toko-home-page-routing.module';

import { TokoHomePagePage } from './toko-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokoHomePagePageRoutingModule
  ],
  declarations: [TokoHomePagePage]
})
export class TokoHomePagePageModule {}
