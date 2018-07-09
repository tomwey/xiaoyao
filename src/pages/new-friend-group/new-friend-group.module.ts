import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFriendGroupPage } from './new-friend-group';

@NgModule({
  declarations: [
    NewFriendGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFriendGroupPage),
  ],
})
export class NewFriendGroupPageModule {}
