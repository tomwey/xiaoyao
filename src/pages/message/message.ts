import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  title: string = '消息';
  showEmojiPicker: boolean = false;
  editorMsg: string = '';

  @ViewChild(Content) content: Content;
  
  constructor(
    public navCtrl: NavController, 
    private messages: Messages,
    public navParams: NavParams
  ) {
    this.title = this.navParams.data.name;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessagePage');
  }

  ionViewWillLeave() {
    this.messages.unsubscribe('test1234', (success, error) => {

    });
  }

  ionViewDidEnter() {
    this.messages.subscribe('test1234', (msg) => {
      console.log(msg);
    });
  }

  switchEmojiPicker() {

  }

  sendMsg() {
    this.messages.publish('test1234', this.editorMsg, null, null);
  }

  openSetting() {
    // this.navCtrl.push('MessageSettingPage');
    this.navCtrl.push('GroupSettingPage');
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

}
