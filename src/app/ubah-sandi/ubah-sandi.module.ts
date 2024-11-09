import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahSandiPageRoutingModule } from './ubah-sandi-routing.module';

import { UbahSandiPage } from './ubah-sandi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbahSandiPageRoutingModule
  ],
  declarations: [UbahSandiPage]
})
export class UbahSandiPageModule {}
