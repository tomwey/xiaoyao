import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
import { Messages } from '../../provider/Messages';

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
  roomid: any;
  // roomConfig: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    private messages: Messages,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) {
    this.person = this.navParams.data.user;
    this.roomid = this.navParams.data.roomid;
    this.config = this.navParams.data.roomconfig;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessageSettingPage');
  }

  config: any = {
    topmsg: false,
    pushoffline: false,
    tips: true
  };

  recommend() {
    let modal = this.modalCtrl.create('RecommendPage', this.person);
    modal.onDidDismiss(() => {

    });
    modal.present();
  }

  changeConfig(field) {
    let value = this.config[field] ? '1' : '0';
    // console.log(value);
    this.socials.SetChatConfig(this.roomid, '0', field, value)
      .then(data => {
        
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了');
        // this.config[field] = !this.config[field];
      });
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
    this.messages.DelMessages(this.roomid)
      .then(data => {
        this.tools.showToast('删除成功');
        this.events.publish('msg:removed');
      })
      .catch(error => {
        this.tools.showToast('删除失败');
      });
  }

}
