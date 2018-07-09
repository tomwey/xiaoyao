import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, isInvite: true });
  }

  friends: any = [
    {
      avatar: 'assets/imgs/logo.png',
      name: 'Darli&Uncle',
      ID: '227678',
      sex: 0,
    },
    {
      avatar: 'assets/imgs/logo.png',
      name: 'Darli&Uncle',
      ID: '227678',
      sex: 0,
    },
    {
      avatar: 'assets/imgs/logo.png',
      name: 'Darli&Uncle',
      ID: '227678',
      sex: 0,
    },
  ];

}
