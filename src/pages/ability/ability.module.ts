import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbilityPage } from './ability';

@NgModule({
  declarations: [
    AbilityPage,
  ],
  imports: [
    IonicPageModule.forChild(AbilityPage),
  ],
})
export class AbilityPageModule {}
