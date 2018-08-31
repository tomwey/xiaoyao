import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content, Events, AlertController } from 'ionic-angular';
import { Messages, ChatMessage, MessagePayload } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';
import { Socials } from '../../provider/Socials';
import { GroupSettingPage } from '../group-setting/group-setting';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var Recorder;

// @IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  // uid: 用户的ID
  // nick: 用户的昵称
  // fullscreen: 是否全屏
  // roomid: 聊天室ID
  // roomtype: 传0或1，0表示群，1表示个人
  // toid: 如果聊天是对个人，此值为toUserId，如果是对群聊天，此值传groupid
  // toname: 如果聊天对个人，此值为该用户的昵称，如果是对群聊天，那么此值是群的名字加一个群成员数

  title: string = '消息';
  showEmojiPicker: boolean = false;
  isAudioInput: boolean = false;

  editorMsg: string = '';
  hideFooter: boolean = false;

  msgList: ChatMessage[] = [];

  // toUser: UserInfo;

  recorder: any;

  roomid: string = null;
  roomtype: string = null;
  // groupid: string = null;

  recordingState: string = '0';
  recordingTotalLength: number = 30;
  recordingLength: number = 0;
  recordingTimer: any;

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') msgInput: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  userId: any;
  toUserId: any;
  fullscreen: string = null;

  roomconfig: any = {
    topmsg: false,
    pushoffline: false,
    tips: true
  };

  btnHeight: number;

  constructor(
    public navCtrl: NavController, 
    private messages: Messages,
    // private api: ApiService,
    private tools: Tools,
    private alertCtrl: AlertController,
    private renderer: Renderer,
    private socials: Socials,
    private events: Events,
    public navParams: NavParams
  ) {
    
    this.title = decodeURI(this.navParams.data.toname || Utils.getQueryString('toname'));

    this.fullscreen = this.navParams.data.fullscreen || Utils.getQueryString('fullscreen');
    
    this.roomtype = Utils.getQueryString('roomtype') || this.navParams.data.roomtype;
    this.userId = Utils.getQueryString('uid');
    this.toUserId = (this.navParams.data.toid || Utils.getQueryString('toid')).toString();
    // console.log(this.toUserId);

    this.events.subscribe('uploadimage', () => {
      this.sendImageMsg();
    });
  }

  sendImageMsg() {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  touchStart(ev) {
    this.btnHeight = ev.target.clientHeight;
    this.recordingState = '1';
    this.recordingLength = 0;
    
    this.startCountDown();
  }

  startCountDown() {
    if (!this.recordingTimer) {
      this.recordingTimer = setInterval(() => {
        this.recordingLength++;
        if (this.recordingLength == 30) {
          clearInterval(this.recordingTimer);
          this.recordingTimer = null;
        }
      }, 1000);
      this.startRecording();
    }
  }

  startRecording() {

  }

  stopRecording() {
    // 停止录音
    // 然后上传
    setTimeout(() => {
      this.recordingState = '0';
    }, 50);
  }

  touchEnd(ev) {
    clearInterval(this.recordingTimer);
    this.recordingTimer = null;
    if (this.recordingState == '2') {
      setTimeout(() => {
        this.recordingState = '0';
      }, 50);
    } else {
      this.stopRecording();
    }
  }

  touchMove(ev) {
    let touches = ev.touches;
    if (touches.length > 0) {
      let touch = touches[0];
      const dty = (document.body.clientHeight - this.btnHeight);
      if (touch.clientY < dty) {
        // console.log('已经移除了');
        this.recordingState = '2';
      } else {
        // console.log('在范围内');
        this.recordingState = '3';
      }
    }
  } 

  selectedFiles(ev) {
    let files: FileList = this.fileInput.nativeElement.files;
    console.log(files);

    if (files.length == 0) return false;

    let file = files[0];

    if (!this.isImageFile(file)) {
      let alert = this.alertCtrl.create({
        title: '图片格式错误',
        subTitle: '不正确的图片格式，仅支持png,jpg,gif类型的图片',
        buttons: ['确定']
      });
      alert.present();
      return false;
    } 

    this.uploadImage(file);
    
  }

  uploadImage(file) {
    let payload = {
      roomid: this.roomid,
      userId: Utils.getQueryString('uid'),
      toUserId: this.toUserId,//(this.toUser.friendid || this.toUser['uid'] || this.toUser.id).toString(),
      toUserType: '',
      contenttype: '2',
      message: '[图片]',
      len: '0',
      msgtype: '1',
      totype: this.roomtype,
      file: file,
    };
    this.messages.sendChatMessage(payload)
      .then(data => {
        this.editorMsg = '';
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  isImageFile(file: File): boolean {
    let ext: any = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MessagePage');

    setTimeout(() => {
      this.getMessages();
    }, 200);

    this.events.subscribe('msg:removed', () => {
      this.msgList = [];
    });
  }

  close() {
    if (this.fullscreen == '1') {
      window.location.href = 'uniwebview://back';
    } else if (this.fullscreen == '2') {
      this.hideFooter = true;
      this.navCtrl.pop();
    }
  }

  // scrollTokeyboardHeight() {//让content向上滚动 软键盘的高度
  //   　this.content.scrollTo(0,e.keyboardHeight);
  //  }

  setMsgConfig(msg) {
    let firstMsg = msg;
    this.roomconfig.topmsg = firstMsg.topmsg == '1';
    this.roomconfig.pushoffline = firstMsg.pushoffline == '1';
    this.roomconfig.tips = firstMsg.tips == '1';
  }

  getMessages() {
    this.messages.GetChatMessages(this.toUserId, this.roomtype, "","")
      .then(data => {
        console.log(data);
        let msgs = data && data['data'];
        if (msgs.length > 0) {
          this.subscribeRoom(msgs[0]);
          
          this.setMsgConfig(msgs[0]);

          // let msg = msgs[0];
          // this.messages.ReadMessages(msg.roomid);
        }

        // console.log(msgs);
        // console.log(1111111);
        let temp = [];
        msgs.forEach(msg => {
          // console.log(msg.send_to);
          // console.log(msg.send_from);
          // console.log(msg.content_type);

          if (msg.send_content && msg.send_content != 'NULL' && msg.content_type != '5') {
            let chatMsg: ChatMessage = {
              userId: msg.send_from,
              userName: msg.nick,
              userAvatar: msg.headurl,
              toUserId: msg.send_to,
              time: msg.senddate,
              message: (msg.conent_type || msg.content_type) == '4' ? '[玩家名片]' : msg.send_content,
              status: 'success',
              roomid: msg.roomid,
              contenttype: msg.conent_type || msg.content_type,
              roomtype: msg.roomtype,
              msgtype: msg.msgtype,
              contact: (msg.conent_type || msg.content_type) == '4' ? JSON.parse(msg.send_content) : null,
            };
            temp.push(chatMsg);
            console.log(temp);
          }
          
          // this.msgList.push(chatMsg);
        });
        this.msgList = temp;
        // console.log(temp);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  openFriend2(uid) {
    if (uid == this.userId) {
      return;
    }

    if (this.fullscreen == '0') {
      window.location.href = `uniwebview://openFriend?uid=${Utils.getQueryString('uid')}&nick=${Utils.getQueryString('nick')}&fullscreen=1&page=frienddetail&friendid=${uid}`;
    } else if (this.fullscreen == '2') {
      this.socials.GetUserInfo(uid)
        .then(data => {
          if (data && data['data']) {
            let arr = data['data'];
            this.navCtrl.push('FriendDetailPage', arr[0]);
          }
        })
        .catch(error => {
          this.tools.showToast('获取用户资料失败');
        });
    }
  }

  openFriend(person) {
    if (this.fullscreen == '0') {
      window.location.href = `uniwebview://openFriend?uid=${Utils.getQueryString('uid')}&nick=${Utils.getQueryString('nick')}&fullscreen=1&page=frienddetail&friendid=${person.friendid}`
    } else if (this.fullscreen == '2') {
      this.navCtrl.push('FriendDetailPage', person);
    }
  }

  subscribeRoom(msg) {
    this.roomid = msg['roomid'];

    console.log('获取到房间号了');

    this.messages.onReceivedMessage((payload) => {
      // console.log(123);
      console.log(payload);
      let receivedMsg = payload.msg || {};
      console.log(this.roomid);
      if (receivedMsg.roomid && this.roomid && this.roomid == receivedMsg.roomid) {
        this.pushNewMsg(receivedMsg);
        // 标记消息已读

      }
    });
  }

  ionViewWillLeave() {
    // this.hideFooter = true;

    if (this.roomid) {
      this.messages.ReadMessages(this.roomid);
    }
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  private setTextareaScroll() {
    const input =this.msgInput.nativeElement;
    input.scrollTop = input.scrollHeight;
  }

  openAudio() {
    this.isAudioInput = !this.isAudioInput;
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    this.showEmojiPicker = false;
    this.content.resize();

    let payload = {
      roomid: this.roomid,
      userId: Utils.getQueryString('uid'),
      toUserId: this.toUserId,//(this.toUser.friendid || this.toUser['uid'] || this.toUser.id).toString(),
      toUserType: '',
      contenttype: '1',
      message: this.editorMsg,
      len: '0',
      msgtype: '1',
      totype: this.roomtype,
    };
    this.messages.sendChatMessage(payload)
      .then(data => {
        this.editorMsg = '';
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  pushNewMsg(msg) {
    // const userId = Utils.getQueryString('uid');
      // toUserId = this.toUser.friendid || this.toUser.id;
    
    // if (msg.userId === userId && msg.toUserId === this.toUserId) {

      // let chatMsg: ChatMessage = {
      //   userId: msg.send_from,
      //   userName: msg.nick,
      //   userAvatar: msg.headurl,
      //   toUserId: msg.send_to,
      //   time: msg.senddate,
      //   message: msg.send_content,
      //   status: 'success',
      //   roomid: msg.roomid,
      //   roomtype: msg.roomtype,
      //   msgtype: msg.msgtype,
      //   contenttype: msg.content_type,
      // };

      console.log(msg);

      let chatMsg: ChatMessage = {
        userId: msg.send_from,
        userName: msg.nick,
        userAvatar: msg.headurl,
        toUserId: msg.send_to,
        time: msg.senddate,
        message: (msg.conent_type || msg.content_type) == '4' ? '[玩家名片]' : msg.send_content,
        status: 'success',
        roomid: msg.roomid,
        contenttype: msg.conent_type || msg.content_type,
        roomtype: msg.roomtype,
        msgtype: msg.msgtype,
        contact: (msg.conent_type || msg.content_type) == '4' ? JSON.parse(msg.send_content) : null,
      };

      this.msgList.push(chatMsg);
    // } else if (msg.toUserId === userId && msg.userId === this.toUserId) {
    //   this.msgList.push(msg);
    // }
    this.scrollToBottom();
  }

  // getMsgIndexById(id: string) {
  //   return this.msgList.findIndex(e => e.msgId === id);
  // }

  private focus() {
    if (this.msgInput && this.msgInput.nativeElement) {
      this.msgInput.nativeElement.focus();
    }
  }

  parseContactMsg(msg) {
    let contact = JSON.parse(msg.message);
    return contact;
  }

  openSetting() {
    if (this.roomtype == '1') {
      this.navCtrl.push('MessageSettingPage', { 
        roomid: this.roomid, roomconfig: this.roomconfig, toUserId: this.toUserId});
    } else {
      this.loadGroupAndOpen();
    }
  }

  loadGroupAndOpen() {
    this.socials.GetGroupInfo(this.toUserId)
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          let arr = data['data'];
          let group = arr[0];
          this.navCtrl.push(GroupSettingPage, {group: group});
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
    // this.navCtrl.push('GroupSettingPage', group);
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
