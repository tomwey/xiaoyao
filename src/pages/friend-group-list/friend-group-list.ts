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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groups = this.navParams.data;
    console.log(this.groups);
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


}
