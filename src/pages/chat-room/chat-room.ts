import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';
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

  // audioPlayer: any = new Audio('assets/imgs/new_msg.mp3'); 

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
      let msg = payload.msg;
      // if (msg && (msg.toid || msg.toUserId) == Utils.getQueryString('uid')) {
        this.handleMsg(msg);

        // this.playAudio();

      // }
    });

    // setTimeout(() => {
    //   console.log('播放音效');
    //   this.playAudio();
    // }, 3000);
  }

  handleMsg(msg) {
    // 不显示自己的牌桌邀请好友
    if (msg.content_type == '5' && msg.toid == Utils.getQueryString('uid')) return;

    let roomid = msg.roomid;
    let index = this.findRoom(roomid);
    if (index == -1) return;

    let unreadcount = 0;

    if (index != -1) {
      let room = this.chatRooms[index];
      unreadcount = parseInt(room.unreadcount);
      this.chatRooms.splice(index, 1);
    } 

    let newMsg = {
      headurl: msg.groupheadurl || msg.headurl,
      name: msg.groupname || msg.nick,
      send_content: msg.send_content,
      senddate: (msg.senddate || '').replace('+', ' '),
      roomid: msg.roomid,
      unreadcount: (unreadcount + 1).toString(),
      toid: msg.send_to,
      typeid: msg.roomtype || '1',
      content_type: msg.content_type,
      msgtype: msg.msgtype,
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
    // this.audioPlayer.play();
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

  formatRoomMessage(room) {

    if (room.msgtype == '10') {
      if (room.content_type == '5') {
        let msg = JSON.parse(room.send_content);
        // console.log(msg);
        return `${msg.nick}约您进入${decodeURI(msg.playing)}`;
      }
    }

    if (room.msgtype != '1') {
      return room.send_content;
    }

    if (room.content_type == '4') {
      return '[玩家名片]';
    } 

    if (room.content_type == '2') {
      return '[图片]'
    }

    if (room.content_type == '3') {
      return '[语音]'
    }

    return room.send_content;
  }

  handleRooms(arr) {
    // console.log(arr);
    arr.sort((e1,e2) => {
      return e1.senddate < e2.senddate;
    });
    if (arr.length > 0) {
      let msg = arr[0];
      if (msg.content_type == '5' && msg.toid == Utils.getQueryString('uid')) {
        arr.splice(0,1);
      }
    }
    this.chatRooms = arr;
  }

  openChat(room) {
    let roomtype = room.typeid || room.roomtype;
    let fromId = room.fromid;
    let uid    = Utils.getQueryString('uid');
    let fromName = Utils.getQueryString('nick');
    let toId = room.toid;
    let toName = room.name;

    let url;
    if (room.msgtype == '10') {
      // 牌桌里面的邀请
      let msg = JSON.parse(room.send_content);
      url = `uniwebview://openRoom?uid=${uid}&fromid=${fromId}&nick=${fromName}&fullscreen=0&toid=${msg.groupid}&roomid=${msg.roomid}&roomtype=0&deskid=${msg.deskid}`;
    } else {
      if (roomtype == '0') {
        url = `uniwebview://openGroup?uid=${uid}&fromid=${fromId}&nick=${fromName}&fullscreen=0&roomid=${room.roomid}&roomtype=${roomtype}&toid=${toId}&toname=${toName}&page=message`;
      } else {
        url = `uniwebview://openMessage?uid=${uid}&fromid=${fromId}&nick=${fromName}&fullscreen=1&roomid=${room.roomid}&roomtype=${roomtype}&toid=${toId}&toname=${toName}&page=message`;
      }
    }
    
    window.open(url);

    // if (roomtype == '0') {
    //   window.location.href = `uniwebview://openGroup?uid=${fromId}&nick=${fromName}&fullscreen=0&roomid=${room.roomid}&roomtype=${roomtype}&toid=${toId}&toname=${toName}&page=message`;
    // } else {
    //   window.location.href = `uniwebview://openMessage?uid=${fromId}&nick=${fromName}&fullscreen=1&roomid=${room.roomid}&roomtype=${roomtype}&toid=${toId}&toname=${toName}&page=message`;
    // }
  }
}
