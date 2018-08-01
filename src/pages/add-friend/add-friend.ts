import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Messages } from '../../provider/Messages';
import { Socials } from '../../provider/Socials';

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
    // private messages: Messages,
    private socials: Socials,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
    this.socials.SearchFriends('').then(data => {
      console.log(data);
      if (data && data['data']) {
        this.friends = data['data'];
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, isInvite: true });
  }

  findFriend(type) {
    this.navCtrl.push('FindFriendPage', { type: type });
  }

  friends: any = [];

}
