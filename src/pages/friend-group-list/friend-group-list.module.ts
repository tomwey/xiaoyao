import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendGroupListPage } from './friend-group-list';

@NgModule({
  declarations: [
    FriendGroupListPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendGroupListPage),
  ],
})
export class FriendGroupListPageModule {}
