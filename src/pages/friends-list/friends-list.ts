import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';

/**
 * Generated class for the FriendsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html',
})
export class FriendsListPage {

  constructor(public navCtrl: NavController, 
    private socials: Socials,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendsListPage');
    this.loadData();
  }

  loadData() {
    this.socials.SearchFriends('')
      .then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
        }
      })
  }

  close() {
    window.location.href = 'uniwebview://back';
  }

  openFriend(person) {
    this.navCtrl.push('FriendDetailPage', { person: person, fullscreen: '2'});
  }

  startSearch(keyword) {
    this.socials.SearchFriends(keyword).then(data => {
      console.log(data);
      if (data && data['data']) {
        this.friends = data['data'];
      }
    })
    .catch(error => {
      // console.log(error);
    });
  }

  sendInvite(person, ev:Event) {
    ev.stopPropagation();

    console.log(person);
  }

  friends: any = [
    
  ];

}
