import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.html',
})
export class FriendDetailPage {

  person: any;
  isInvite: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.data.person || this.navParams.data;
    this.isInvite = this.navParams.data.isInvite;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendDetailPage');
  }

  report() {
    this.navCtrl.push('ReportPage');
  }

}
