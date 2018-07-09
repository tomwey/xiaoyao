import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FindFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-friend',
  templateUrl: 'find-friend.html',
})
export class FindFriendPage {

  findType: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.findType = this.navParams.data.type;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindFriendPage');
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
