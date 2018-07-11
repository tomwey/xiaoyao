import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindMobilePage } from './bind-mobile';

@NgModule({
  declarations: [
    BindMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(BindMobilePage),
  ],
})
export class BindMobilePageModule {}
