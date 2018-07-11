import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteLogPage } from './invite-log';

@NgModule({
  declarations: [
    InviteLogPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteLogPage),
  ],
})
export class InviteLogPageModule {}
