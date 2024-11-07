import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilChangePageRoutingModule } from './profil-change-routing.module';

import { ProfilChangePage } from './profil-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilChangePageRoutingModule
  ],
  declarations: [ProfilChangePage]
})
export class ProfilChangePageModule {}
