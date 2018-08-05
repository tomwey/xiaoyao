import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Messages } from '../provider/Messages';
import { Utils } from '../provider/Utils';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { MessagePage } from '../pages/message/message';
import { GroupSettingPage } from '../pages/group-setting/group-setting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;// = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    private messages: Messages,
    splashScreen: SplashScreen
  ) {
    let page = Utils.getQueryString('page');
    if (page && page == 'chat') {
      this.rootPage = ChatRoomPage;
    } else if (page && page == 'message') {
      this.rootPage = MessagePage;
    } else if (page && page == 'groupsetting') {
      this.rootPage = GroupSettingPage;
    } else if (page && page == 'frienddetail') {
      // 玩家详情
      this.rootPage = 'FriendDetailPage';
    } else {
      this.rootPage = HomePage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    this.initSocket();

    // this.fixedKeyboardBug();
  }

  // fixedKeyboardBug() {
  //   let
  //     appEl = <HTMLElement>(document.getElementsByTagName('ION-APP')[0]),
  //     appElHeight = appEl.clientHeight;

  //     window.addEventListener('native.keyboardshow',(e) => {
  //       appEl.style.height = (appElHeight - (<any>e).keyboardHeight) + 'px';
  //     });

  //     window.addEventListener('native.keyboardhide', () => {
  //       appEl.style.height = '100%';
  //     })
  // }

  private initSocket()
  {
    const uid = Utils.getQueryString('uid');
    if (uid) {
      this.messages.init(uid);
    }
    
  }
}

