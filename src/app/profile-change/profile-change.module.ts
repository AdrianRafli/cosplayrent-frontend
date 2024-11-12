import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileChangePageRoutingModule } from './profile-change-routing.module';

import { ProfileChangePage } from './profile-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileChangePageRoutingModule
  ],
  declarations: [ProfileChangePage]
})
export class ProfileChangePageModule {}
