import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { Messages } from '../provider/Messages';
import { Utils } from '../provider/Utils';
import { PipesModule } from '../pipes/pipes.module';
import { ApiService } from '../provider/api-service';
import { Tools } from '../provider/Tools';
import { Socials } from '../provider/Socials';
import { EmojiProvider } from '../provider/emoji';
import { EmojiPickerComponentModule } from '../components/emoji-picker/emoji-picker.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatRoomPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '返回',
    }),
    PipesModule,
    EmojiPickerComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatRoomPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    Messages,
    ApiService,
    Tools,
    Socials,
    EmojiProvider,
  ]
})
export class AppModule {}
