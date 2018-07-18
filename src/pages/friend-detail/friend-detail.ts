import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

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
  isInvite: boolean;
  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.person = this.navParams.data.person || this.navParams.data;
    this.isInvite = this.navParams.data.isInvite;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendDetailPage');
  }

  block(person) {
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
    this.navCtrl.push('MessagePage', this.person);
  }

  changeNote(person) {
    this.navCtrl.push('ChangeRemarkNamePage', person);
  }

  tuijian(person) {
    let modal = this.modalCtrl.create('RecommendPage', person);
    modal.onDidDismiss(() => {

    });
    modal.present();
    // this.navCtrl.push('RecommendPage', person);
  }

  report() {
    this.navCtrl.push('ReportPage');
  }

}
