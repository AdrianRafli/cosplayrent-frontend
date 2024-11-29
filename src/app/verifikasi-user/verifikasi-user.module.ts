import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifikasiUserPageRoutingModule } from './verifikasi-user-routing.module';

import { VerifikasiUserPage } from './verifikasi-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifikasiUserPageRoutingModule
  ],
  declarations: [VerifikasiUserPage]
})
export class VerifikasiUserPageModule {}
