import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Messages } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';

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

  group: any;
  isMaster: any;
  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public navParams: NavParams) {
      this.group = this.navParams.data;
      console.log(this.group);
      this.isMaster = this.group.master_id === Utils.getQueryString('uid');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupSettingPage');
    this.prepareFriends();
  }

  openMemebers() {
    this.navCtrl.push('GroupMembersPage', this.group);
  }

  openGameSetting() {
    this.navCtrl.push('GroupGameSettingPage');
  }

  openGroupJiang() {
    this.navCtrl.push('GroupJiangPage');
  }

  rank() {
    this.navCtrl.push('RankPage', this.group);
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
    const arr = this.group.data || [];
    let temp = JSON.parse(JSON.stringify(arr));
    temp.push({headurl: 'assets/imgs/btn_plus.png', oper_type: 1});
    temp.push({headurl: 'assets/imgs/btn_jian.png', oper_type: 2});
    this.friends = temp;
  }

  clickItem(item) {
    if (!item.oper_type) {
      this.openFriendDetail(item);
    } else {
      this.handleOperation(item.oper_type);
    }
  }

  openFriendDetail(item) {
    this.navCtrl.push('FriendDetailPage', item);
  }

  handleOperation(type) {
    // if (type == 1) {
    //   // 添加群成员
    //   this.addOrDelMembers(1);
    // } else if (type == 2) {
    //   // 删除群成员
    //   this.addOrDelMembers(2);
    // }
    this.navCtrl.push('MemberOperationPage', { group: this.group, oper_type: type });
  }

  addOrDelMembers(action) {

  }

  removeMsg() {
    this.alertCtrl.create({
      title: '',
      subTitle: '确认删除全部的聊天记录吗？',
      buttons: [
        {
          text: '取消',
          role: 'Cancel',
        },
        {
          text: '确定',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  rebackGroup() {
    this.alertCtrl.create({
      title: '',
      subTitle: this.isMaster ? '是否退出并解散本群？' : '确认退出本群？',
      buttons: [
        {
          text: '取消',
          role: 'Cancel',
        },
        {
          text: '确定',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  config: any = {
    isTop: false,
    msgTip: true,
    offlineNotify: true,
  };

  friends: any = [];

}
