import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { PipesModule } from '../../pipes/pipes.module';
import { EmojiPickerComponentModule } from '../../components/emoji-picker/emoji-picker.module';

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    PipesModule,
    EmojiPickerComponentModule,
  ],
})
export class MessagePageModule {}
