import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the FriendGroupListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-group-list',
  templateUrl: 'friend-group-list.html',
})
export class FriendGroupListPage {

  groups: any;
  groupData: any;
  userId: any;
  constructor(public navCtrl: NavController, 
    private events: Events,
     public navParams: NavParams) {
    this.groups = this.navParams.data['data'];
    this.groupData = this.navParams.data;

    this.userId = Utils.getQueryString('uid');

    // console.log(this.groupData);
    this.events.subscribe('group:removed', (group) => {
      let index = this.groups.indexOf(group);
      if (index != -1) {
        this.groups.splice(index, 1);
      }
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendGroupListPage');
  }

  groupAvatar(group) {
    return "assets/imgs/to-user.jpg";
  }

  openGroup(group) {
    this.navCtrl.push('GroupMessagePage', group);
  }

  calcMemberCount(group) {
    // console.log(group);
    // console.log(this.groupData);
    if (!group) return 0;
    if (!group.data) return 0;

    return group.data.length;
    // let arr = this.groupData[group.id.toString()];
    // return arr.length;
  }


}
