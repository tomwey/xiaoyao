import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the GroupMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-members',
  templateUrl: 'group-members.html',
})
export class GroupMembersPage {

  members: any = [];
  group: any;
  initData: any = [];
  keyword: any = '';

  canAdd: boolean = false;

  constructor(public navCtrl: NavController, 
    // private messages: Messages,
    private events: Events,
    private socials: Socials,
    public navParams: NavParams) {
    // this.members = this.messages.GetUsers();
    this.group = this.navParams.data.group;
    this.canAdd = this.navParams.data.canAdd;
    
    if (this.group) {
      this.members = this.group.data || [];
      this.initData = this.members;
    }
  }

  ionViewDidLoad() {
    this.events.subscribe('members:changed', (item) => {
      // let arr = item.data;
      if (this.group) {
        // this.group.data = this.group.data.concat(arr);

        this.members = this.group.data || [];

        this.initData = this.members;
      }
    });
  }

  openDetail(item) {
    let uid = item.friendid || item.uid;
    if (uid == Utils.getQueryString('uid')) return;
    
    this.socials.GetUserInfo(uid)
    .then(data => {
      if (data && data['data']) {
        let arr = data['data'];
        this.navCtrl.push('FriendDetailPage', {person:arr[0],groupid: this.group.id, fullscreen: '2'});
      }
    })
    .catch();

    // this.navCtrl.push('FriendDetailPage', item);
  }

  addMember() {
    this.navCtrl.push('MemberOperationPage', 
    { group: this.group, oper_type: 1 });
  }

  startSearch(kw) {
    // console.log(kw);

    if (kw.trim() == '') {
      this.members = this.initData;
      return;
    }

    this.members = this.initData.filter(item => {
      let uid = item.friendid || item.uid || item.id;
      // console.log(uid);
      return item.nick.toLowerCase().indexOf(kw.trim().toLowerCase()) > -1 || 
            uid.indexOf(kw.trim().toLowerCase()) > -1;
    });
  }

}
