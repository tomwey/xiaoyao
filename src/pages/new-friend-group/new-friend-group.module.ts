import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFriendGroupPage } from './new-friend-group';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewFriendGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFriendGroupPage),
    ComponentsModule,
  ],
})
export class NewFriendGroupPageModule {}
