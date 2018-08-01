import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  group: any;
  members: any = [];
  currentUser: any;

  rankType: string = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data) {
      this.members = this.navParams.data.data || [];
    }

    this.members.forEach(element => {
      let uid = element.friendid || element.uid || element.id;
      if (uid == Utils.getQueryString('uid')) {
        element.isMe = true;
        this.currentUser = element;
      }
    });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RankPage');
  }

  segmentChanged(ev) {

  }

  openDetail(item) {
    if (!item.isMe) {
      this.navCtrl.push('FriendDetailPage', item);
    }
  }

}
