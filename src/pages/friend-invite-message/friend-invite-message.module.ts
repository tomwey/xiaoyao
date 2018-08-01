import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendInviteMessagePage } from './friend-invite-message';

@NgModule({
  declarations: [
    FriendInviteMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendInviteMessagePage),
  ],
})
export class FriendInviteMessagePageModule {}
