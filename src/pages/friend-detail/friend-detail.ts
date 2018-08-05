import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
import { MessagePage } from '../message/message';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the FriendDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.html',
})
export class FriendDetailPage {

  person: any;
  // isInvite: boolean;
  // isblack: boolean = false;
  fullscreen: string;

  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.person = this.navParams.data.person || this.navParams.data;

    // this.isInvite = this.navParams.data.isInvite;
    
    this.fullscreen = this.navParams.data.fullscreen || Utils.getQueryString('fullscreen');
    // this.isblack = this.person.friendtype === '2'
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendDetailPage');
    if (!this.person) {
      this.loadFriend();
    }
  }

  loadFriend() {
    const friendid = Utils.getQueryString('friendid');
    // console.log(friendid);
    this.socials.GetUserInfo(friendid)
      .then(data => {
        if (data && data['data']) {
          let arr = data['data'];
          this.person = arr[0];
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      })
  }

  close() {
    if (this.fullscreen == '1') {
      window.location.href = "uniwebview://back";
    } else {
      this.navCtrl.pop();
    }
  }

  block(person) {
    if (person.friendtype == '2') {
      // 取消拉黑
      this.socials.UnBlockFriend(this.person.friendid || this.person.id)
        .then(data => {
          this.tools.showToast('取消拉黑成功');
          // this.isblack = false;
          this.person.friendtype = '0';
        })
        .catch(error => {
          this.tools.showToast('取消拉黑失败');
        });
      return;
    }

    // 拉黑
    this.alertCtrl.create({
      title: "拉黑提示",
      subTitle: "拉黑后，该玩家加入你所在的牌桌时，系统会对您进行提示（无其他特殊功能），确定继续拉黑玩家？",
      buttons: [
        {
          role: 'Cancel',
          text: '取消'
        },
        {
          text: '确定',
          handler: () => {
            this.socials.BlockFriend(this.person.friendid || this.person.id)
              .then(data => {
                // this.isblack = true;
                this.person.friendtype = '2'
              })
              .catch(error => {
                this.tools.showToast('拉黑失败~');
              });
          }
        }
      ]
    }).present();
  }

  deleteFriend(person)
  {
    this.alertCtrl.create({
      title: "删除提示",
      subTitle: `确定要解除和[${person.nick}]的牌友关系吗？`,
      buttons: [
        {
          role: 'Cancel',
          text: '取消'
        },
        {
          text: '确定',
          handler: () => {
            this.socials.DeleteFriend(person.friendid || person.id).then(data => {
              console.log(data);
              this.events.publish('reload:friends');
              this.navCtrl.pop();
            })
            .catch(error => {
              setTimeout(() => {
                this.tools.showToast("删除牌友失败~");
              }, 200);
            });
          }
        }
      ]
    }).present();
  }

  sendMessage(person) {
    this.navCtrl.push(MessagePage, { fullscreen: '2', roomtype: '1', toname: this.person.nick,
     toid: this.person.friendid || this.person.id });
  }

  changeNote(person) {
    this.navCtrl.push('ChangeRemarkNamePage', person);
  }

  invite(person){
    let modal = this.modalCtrl.create('FriendInvitePage', person);
    modal.onDidDismiss((data) => {

    });
    modal.present();
    // this.socials.AddFriend(person.friendid || person.id)
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

  }

  calcDiamond(diamond) {
    diamond = parseFloat(diamond);
    return (diamond / 10000.0).toFixed(2);
  }

  tuijian() {
    let modal = this.modalCtrl.create('RecommendPage', this.person);
    modal.onDidDismiss(() => {

    });
    modal.present();
    // this.navCtrl.push('RecommendPage', person);
  }

  report() {
    this.navCtrl.push('ReportPage');
  }

}
