import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageSettingPage } from './message-setting';

@NgModule({
  declarations: [
    MessageSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageSettingPage),
  ],
})
export class MessageSettingPageModule {}
