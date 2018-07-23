import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendInvitePage } from './friend-invite';

@NgModule({
  declarations: [
    FriendInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendInvitePage),
  ],
})
export class FriendInvitePageModule {}
