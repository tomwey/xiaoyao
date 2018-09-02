import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
import { Messages } from '../../provider/Messages';

/**
 * Generated class for the GroupSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-group-setting',
  templateUrl: 'group-setting.html',
})
export class GroupSettingPage {

  group: any;
  isMaster: any;
  ability: any = {
    bandelmeber: '1',
    bangameseting: '1',
    baninvite: '1',
    baninviteconfim: '1',
    baninvitelog: '1',
    bannick: '1',
    bannotice: '1',
    banranking: '1',
  };
  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    private messages: Messages,
    public navParams: NavParams) {
      this.group = this.navParams.data.group;
      // console.log(this.group);

      // 暂时注掉
      // this.config.topmsg = this.group.topmsg == '1';
      // this.config.tips = this.group.tips == '1';
      // this.config.pushoffline = this.group.pushoffline == '1';

      // this.setGroupMaster();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupSettingPage');
    // 暂时注掉
    // this.loadAbility();

    // this.prepareFriends();

    // console.log(this.navCtrl.length());

    this.subscribeMembersChanged();

    if (!this.group) {
      this.loadGroup();
    } else {
      this.initData();
    }
    
  }

  loadGroup() {
    this.socials.GetGroupInfo(Utils.getQueryString('groupid') || Utils.getQueryString('toid'))
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          let arr = data['data'];
          this.group = arr[0];
          // this.navCtrl.push('GroupSettingPage', group);

          this.initData();
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  initData() {
      this.config.topmsg = this.group.topmsg == '1';
      this.config.tips = this.group.tips == '1';
      this.config.pushoffline = this.group.pushoffline == '1';

      this.setGroupMaster();

      this.loadAbility();
  }

  close() {
    if (
      Utils.getQueryString('fullscreen') == '0' || 
      Utils.getQueryString('fullscreen') == '1'
    ) {
      // this.navCtrl.pop()
      window.location.href = 'uniwebview://back';
    } else {
      this.navCtrl.pop()
      // window.location.href = 'uniwebview://back';
    }
    // if (this.fullscreen == '1') {
    
    // } else if (this.fullscreen == '2') {
    //   this.hideFooter = true;
    //   this.navCtrl.pop();
    // }
  }

  setGroupMaster() {
    this.isMaster = this.group.master_id === Utils.getQueryString('uid');
  }

  // 一次性修改所有的权限
  setAllAbility(val) {
    for (const key in this.ability) {
      if (this.ability.hasOwnProperty(key)) {
        this.ability[key] = val;
      }
    }
  }

  loadAbility() {
    if (this.group.master_id == Utils.getQueryString('uid')) {
      this.setAllAbility('0');
      this.prepareFriends();
      return;
    }

    this.socials.GetGroupPower(this.group.id)
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          let arr = data['data'] || [];
          if (arr.length > 0) {
            this.ability = arr[0];
          }
        }
        this.prepareFriends();
      })
      .catch(error => {
        // console.log(error);
        this.prepareFriends();
      });
  }

  subscribeMembersChanged() {
    this.events.subscribe('members:changed', (item) => {
      let selectedMembers = item.data;
      let type = item.type;
      if (type == 1) {
        // 添加
        this.group.data = this.group.data.concat(selectedMembers);
      } else if (type == 2) {
        // 删除
        selectedMembers.forEach(element => {
          let index = this.group.data.indexOf(element);
          if (index != -1) {
            this.group.data.splice(index, 1);
          }
        });
      }
      this.prepareFriends();
    });

    this.events.subscribe('reload:group', (uid) => {
      this.setGroupMaster();
      this.loadAbility();
    });
  }

  openMemebers() {
    this.navCtrl.push('GroupMembersPage', {group: this.group, 
      canAdd: this.ability.baninvite == '0' });
  }

  openGameSetting() {
    this.navCtrl.push('GroupGameSettingPage', this.group);
  }

  openGroupJiang() {
    this.navCtrl.push('GroupJiangPage', this.group);
  }

  rank() {
    this.navCtrl.push('RankPage', this.group);
  }

  openInviteConfirm() {
    this.navCtrl.push('InviteConfirmPage', this.group);
  }

  openInviteLog() {
    this.navCtrl.push('InviteLogPage', this.group);
  }

  openAbility() {
    this.navCtrl.push('AbilityPage', this.group);
  }

  prepareFriends() {
    const arr = this.group.data || [];
    let temp = JSON.parse(JSON.stringify(arr));
    if (this.ability.baninvite == '0') {
      temp.push({headurl: 'assets/imgs/btn_plus.png', oper_type: 1});
    }
    
    if (this.ability.bandelmeber == '0') {
      temp.push({headurl: 'assets/imgs/btn_jian.png', oper_type: 2});
    }
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
    console.log(item);
    let uid = item.friendid || item.uid;
    if (uid == Utils.getQueryString('uid')) return;

    this.socials.GetUserInfo(uid)
      .then(data => {
        if (data && data['data']) {
          let arr = data['data'];
          this.navCtrl.push('FriendDetailPage', {person:arr[0],groupid:this.group.id});
        }
      })
      .catch();
    
  }

  handleOperation(type) {
    this.navCtrl.push('MemberOperationPage', { group: this.group, oper_type: type });
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
            console.log(this.group);
            this.messages.DelMessages(this.group.roomid)
              .then(data => {
                this.tools.showToast('删除成功');
                this.events.publish('msg:removed');
              })
              .catch(error => {
                this.tools.showToast('删除失败');
              })
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
            if (this.isMaster) {
              this.dismissGroup();
            } else {
              this.backGroup();
            }
          }
        }
      ]
    }).present();
  }

  dismissGroup() {
    this.operGroup('delGroup');
  }

  backGroup() {
    this.operGroup('exitGroup');
  }

  operGroup(action) {
    this.socials.GroupOperation(action, this.group.id)
      .then(data => {

        this.events.publish('group:removed', this.group);
        let page = this.navCtrl.getByIndex(this.navCtrl.length() - 3);
        console.log(page);
        if (page) {
          this.navCtrl.popTo(page);
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || error);
      });
  } 

  updateNickname() {
    if (this.ability.bannick == '1') {
      this.tools.showToast('不能修改群昵称');
      return;
    } 
    this.navCtrl.push('GroupInputPage', { title: '群昵称',
      action: 'setGroupNick', 
      group: this.group, 
      content: this.group.name })
  }

  updateNotice() {
    if (this.ability.bannotice == '1') {
      this.tools.showToast('不能修改群公告');
      return;
    }
    this.navCtrl.push('GroupInputPage', { title: '群公告',
      action: 'setGroupNotice', 
      group: this.group, 
      content: this.group.notice })
  }

  config: any = {
    topmsg: false,
    tips: true,
    pushoffline: true,
  };

  changeChatConfig(field) {
    let value = this.config[field] ? '1' : '0';
    // console.log(value);
    this.socials.SetChatConfig(this.group.id, '1', field, value)
      .then(data => {
        this.group[field] = this.config[field] ? '1' : '0';
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了');
        // this.config[field] = !this.config[field];
      });
  }

  friends: any = [];

}
