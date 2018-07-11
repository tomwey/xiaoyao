import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupGameSettingPage } from './group-game-setting';

@NgModule({
  declarations: [
    GroupGameSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupGameSettingPage),
  ],
})
export class GroupGameSettingPageModule {}
