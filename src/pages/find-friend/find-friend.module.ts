import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindFriendPage } from './find-friend';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FindFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(FindFriendPage),
    ComponentsModule,
  ],
})
export class FindFriendPageModule {}
