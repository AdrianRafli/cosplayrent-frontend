import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationcodePageRoutingModule } from './verificationcode-routing.module';

import { VerificationcodePage } from './verificationcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationcodePageRoutingModule
  ],
  declarations: [VerificationcodePage]
})
export class VerificationcodePageModule {}
