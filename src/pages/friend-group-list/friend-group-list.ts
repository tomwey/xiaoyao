import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groups = this.navParams.data['data'];
    this.groupData = this.navParams.data;

    console.log(this.groupData);
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

    return 0;
    // let arr = this.groupData[group.id.toString()];
    // return arr.length;
  }


}
