import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

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
  person: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) {
    this.person = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessageSettingPage');
  }

  config: any = {
    isTop: false,
    offlineNotify: false,
    msgTip: true
  };

  recommend() {
    let modal = this.modalCtrl.create('RecommendPage', this.person);
    modal.onDidDismiss(() => {

    });
    modal.present();
  }

  removeMsg() {
    this.alertCtrl.create({
      title: '',
      subTitle: '确认要删除全部的聊天记录吗？',
      buttons: [
        {
          text: '取消',
          role: 'Cancel',
        },
        {
          text: '确定',
          handler: () => {
            this.doRemove();
          }
        }
      ]
    }).present();
  }

  doRemove() {

  }

}
