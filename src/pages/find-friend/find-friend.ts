import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
// import { Messages } from '../../provider/Messages';

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
  keyword: string = '';

  constructor(public navCtrl: NavController,
    // private messages: Messages,
    private socials: Socials,
    public navParams: NavParams) {
    this.findType = this.navParams.data.type;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FindFriendPage');
    // this.friends = this.messages.GetUsers();
    if (this.findType !== 1) {
      setTimeout(() => {
        this.loadNearbyPlayer();
      }, 200);
    }
  }

  loadNearbyPlayer() {
    this.socials.GetNearPlayer()
      .then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
        }
      })
      .catch(error => {});
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, fullscreen: '2' });
  }

  startSearch(keyword) {
    this.socials.SearchFriends(keyword).then(data => {
      console.log(data);
      if (data && data['data']) {
        this.friends = data['data'];
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  friends: any = [
    
  ];

}
