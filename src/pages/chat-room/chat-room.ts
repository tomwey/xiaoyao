import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';

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
  constructor(public navCtrl: NavController, 
    private messages: Messages,
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
      
      let msg = payload.msg;
      if (msg && (msg.toid || msg.toUserId) == Utils.getQueryString('uid')) {
        this.handleMsg(msg);
      }
    });
  }

  handleMsg(msg) {
    let roomid = msg.roomid;
    let index = this.findRoom(roomid);
    if (index != -1) {
      this.chatRooms.splice(index, 1);
    } 

    this.chatRooms.splice(0, 0, msg);
  }

  findRoom(roomid) {
    for (var i=0; i<this.chatRooms.length; i++) {
      if (this.chatRooms[i].roomid == roomid) {
        return i;
      }
    }
    return -1;
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
    this.chatRooms = arr;
  }

  openChat(room) {
    let roomtype = room.typeid;
    let fromId = Utils.getQueryString('uid');
    let fromName = Utils.getQueryString('nick');
    let toId = room.toid;
    let toName = room.name;
    window.location.href = `uniwebview://openMessage?fromId=${fromId}&fromName=${fromName}&toId=${toId}&toName=${toName}&type=${roomtype}`;
  }

}
