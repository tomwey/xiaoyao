import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteConfirmPage } from './invite-confirm';

@NgModule({
  declarations: [
    InviteConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteConfirmPage),
  ],
})
export class InviteConfirmPageModule {}
