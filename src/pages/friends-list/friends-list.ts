import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Messages } from '../../provider/Messages';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the FriendsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html',
})
export class FriendsListPage {

  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private messages: Messages,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendsListPage');
    this.loadData();
  }

  loadData() {
    this.socials.SearchFriends('')
      .then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
        }
      })
  }

  close() {
    window.location.href = 'uniwebview://back';
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, fullscreen: '2'});
  }

  startSearch(keyword) {
    this.socials.SearchFriends(keyword).then(data => {
      console.log(data);
      if (data && data['data']) {
        this.friends = data['data'];
      }
    })
    .catch(error => {
      // console.log(error);
    });
  }

  sendInvite(person, ev:Event) {
    ev.stopPropagation();

    // console.log(person);
    let msg = {
      nick: Utils.getQueryString('nick'),
      groupid: Utils.getQueryString('groupid'),
      roomid: Utils.getQueryString('roomid'),
      playing: Utils.getQueryString('playing'),
    };

    let newMsg = JSON.stringify(msg);

    let payload = {
      roomid: '',
      userId: Utils.getQueryString('uid'),
      toUserId: (person.friendid || person.uid || person.id),//(this.toUser.friendid || this.toUser['uid'] || this.toUser.id).toString(),
      toUserType: '',
      contenttype: '5',
      message: newMsg,
      len: '0',
      msgtype: '10',
      totype: '1',
    };
    this.messages.sendChatMessage(payload)
      .then(data => {
        // this.editorMsg = '';
        // this.tools.showToast('')
        person.invited = !person.invited;
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
    
  }

  friends: any = [
    
  ];

}
