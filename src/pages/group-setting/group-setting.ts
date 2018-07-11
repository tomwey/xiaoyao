import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

/**
 * Generated class for the GroupSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-setting',
  templateUrl: 'group-setting.html',
})
export class GroupSettingPage {

  constructor(public navCtrl: NavController, 
    private messages: Messages,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupSettingPage');
    this.prepareFriends();
  }

  openMemebers() {
    this.navCtrl.push('GroupMembersPage');
  }

  openGameSetting() {
    this.navCtrl.push('GroupGameSettingPage');
  }

  openGroupJiang() {
    this.navCtrl.push('GroupJiangPage');
  }

  rank() {
    this.navCtrl.push('RankPage');
  }

  openInviteConfirm() {
    this.navCtrl.push('InviteConfirmPage');
  }

  openInviteLog() {
    this.navCtrl.push('InviteLogPage');
  }

  openAbility() {
    this.navCtrl.push('AbilityPage');
  }

  prepareFriends() {
    const arr = this.messages.GetUsers();
    let temp = [];
    for (var i=0; i<3; i++) {
      if (i < arr.length) {
        temp.push(arr[i]);
      }
    }
    temp.push({avatar: 'assets/imgs/btn_plus.png'});
    temp.push({avatar: 'assets/imgs/btn_jian.png'});
    if (arr.length < 3) {
      temp.push({ avatar: '' });
    }
    this.friends = temp;
  }

  config: any = {
    isTop: false,
    msgTip: true,
    offlineNotify: true,
  };

  friends: any = [];

}
