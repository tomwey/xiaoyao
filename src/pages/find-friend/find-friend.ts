import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

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
  constructor(public navCtrl: NavController,
    private messages: Messages,
    public navParams: NavParams) {
    this.findType = this.navParams.data.type;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindFriendPage');
    this.friends = this.messages.GetUsers();
  }

  friends: any = [
    
  ];

}
