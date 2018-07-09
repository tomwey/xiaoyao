import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFriendPage } from './add-friend';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFriendPage),
    ComponentsModule,
  ],
})
export class AddFriendPageModule {}
