import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Messages, ChatMessage, UserInfo } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var Recorder;

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  title: string = '消息';
  showEmojiPicker: boolean = false;
  isAudioInput: boolean = false;

  editorMsg: string = '';

  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;

  recorder: any;
  
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') msgInput: ElementRef;
  
  constructor(
    public navCtrl: NavController, 
    private messages: Messages,
    public navParams: NavParams
  ) {
    this.title = this.navParams.data.name;

    this.toUser = this.navParams.data;
    console.log(this.toUser);

    this.user = this.messages.GetUserById(Utils.getQueryString('uid'));
    console.log(this.user);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessagePage');
  }

  ionViewWillLeave() {
    this.messages.unsubscribe('test1234', (success, error) => {

    });
  }

  ionViewDidEnter() {
    this.messages.subscribe('test1234', (payload) => {
      console.log(payload);
      if (payload.msg.userId !== this.user.id) {
        this.pushNewMsg(payload.msg);
      }
    });
  }

  switchEmojiPicker() {

  }

  pressed() {
    console.log('start press...');
    this.recorder = this.recorder || Recorder();
    this.recorder.open(() => {
      this.recorder.start(); // 开始录音
    }, (err) => {
      console.log('无法录音：' + err);
    });
  }

  active() {
    console.log('pressing...');
  }

  released() {
    console.log('release...');
    this.recorder.stop((blob) => {
      console.log(URL.createObjectURL(blob));
      this.recorder.close(); // 释放录音资源
    },(err) => {
      console.log('录音失败：' + err);
    });
  }

  openAudio() {
    this.isAudioInput = !this.isAudioInput;
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      msgId: id,
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Utils.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.messages.sendMsg('test1234', newMsg, (res) => {
      let index = this.getMsgIndexById(id);
      if (index !== -1) {
        this.msgList[index].status = 'success';
      }
    });
  }

  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.msgId === id);
  }

  private focus() {
    if (this.msgInput && this.msgInput.nativeElement) {
      this.msgInput.nativeElement.focus();
    }
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
