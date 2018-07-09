import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { PersonInfoComponent } from '../../components/person-info/person-info';

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
      subTitle: `确定要解除和[${person.name}]的牌友关系吗？`,
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
