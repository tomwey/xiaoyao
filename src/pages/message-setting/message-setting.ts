import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessageSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-setting',
  templateUrl: 'message-setting.html',
})
export class MessageSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessageSettingPage');
  }

  config: any = {
    isTop: false,
    offlineNotify: false,
    msgTip: true
  };

}
