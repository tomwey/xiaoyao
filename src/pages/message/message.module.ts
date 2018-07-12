import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { PipesModule } from '../../pipes/pipes.module';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    PipesModule,
    LongPressModule,
  ],
})
export class MessagePageModule {}
