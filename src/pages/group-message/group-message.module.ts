import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupMessagePage } from './group-message';

@NgModule({
  declarations: [
    GroupMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupMessagePage),
  ],
})
export class GroupMessagePageModule {}
