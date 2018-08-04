import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  chatRooms: any = [];
  error: any = null;

  audioPlayer: any = new Audio('assets/imgs/new_msg.mp3'); 

  constructor(public navCtrl: NavController, 
    private messages: Messages,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChatRoomPage');
    this.loadChatRooms();

    // this.messages.subscribe('12345', (payload) => {
    //   console.log(payload);
    // });
    this.messages.onReceivedMessage((payload) => {
      console.log(payload);
      // this.deviceShake();
      // this.playAudio();
      let msg = payload.msg;
      // if (msg && (msg.toid || msg.toUserId) == Utils.getQueryString('uid')) {
        this.handleMsg(msg);
      // }
    });

    // setTimeout(() => {
    //   console.log('播放音效');
    //   this.playAudio();
    // }, 3000);
  }

  handleMsg(msg) {
    let roomid = msg.roomid;
    let index = this.findRoom(roomid);
    if (index != -1) {
      this.chatRooms.splice(index, 1);
    } 

    let newMsg = {
      icon: msg.userAvatar,
      name: msg.userName,
      send_content: msg.message,
      senddate: (msg.time || '').replace('+', ' '),
      roomid: msg.roomid,
      unreadcount: msg.unreadcount || '1',
      toid: msg.userId,
      typeid: msg.roomtype || '1',
    };
    this.chatRooms.splice(0, 0, newMsg);
  }

  findRoom(roomid) {
    for (var i=0; i<this.chatRooms.length; i++) {
      if (this.chatRooms[i].roomid == roomid) {
        return i;
      }
    }
    return -1;
  }

  // 删除聊天
  deleteChat(room, event: Event) {
    event.stopPropagation();

    this.messages.DelMessages(room.roomid, '1')
      .then(data => {
        let index = this.chatRooms.indexOf(room);
        if (index !== -1) {
          this.chatRooms.splice(index, 1);
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  // 关闭提示
  closeTip(room) {

  }

  // 设备震动
  deviceShake() {
    var vibrateSupport = "vibrate" in navigator;
    if (vibrateSupport) { //兼容不同的浏览器  
      navigator.vibrate = navigator.vibrate || 
        navigator['webkitVibrate'] || navigator['mozVibrate'] || navigator['msVibrate'];  
    }
    navigator.vibrate(1000);
  }

  // 播放声音
  playAudio() {
    this.audioPlayer.play();
  }

  loadChatRooms() {
    this.messages.GetChatRooms()
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          this.handleRooms(data['data']);
        }

        if (this.chatRooms.length == 0) {
          this.error = '暂无聊天';
        } else {
          this.error = null;
        }
      })
      .catch(error => {
        // console.log(error);
        this.error = error.message || '服务器出错了~';
      });
  }

  handleRooms(arr) {
    // console.log(arr);
    arr.sort((e1,e2) => {
      return e1.senddate < e2.senddate;
    });
    this.chatRooms = arr;
  }

  openChat(room) {
    let roomtype = room.typeid || room.roomtype;
    let fromId = Utils.getQueryString('uid');
    let fromName = Utils.getQueryString('nick');
    let toId = room.toid;
    let toName = room.name;
    window.location.href = `uniwebview://openMessage?uid=${fromId}&nick=${fromName}&fullscreen=1&roomid=${room.roomid}&roomtype=${roomtype}&toid=${toId}&toname=${toName}&page=message`;
  }

}
