import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

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

  constructor(public navCtrl: NavController, 
    private messages: Messages,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
    this.friends = this.messages.GetUsers();
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, isInvite: true });
  }

  findFriend(type) {
    this.navCtrl.push('FindFriendPage', { type: type });
  }

  friends: any = [];

}
