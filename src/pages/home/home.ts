import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Messages } from '../../provider/Messages';
import { Socials } from '../../provider/Socials';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: any = [];

  constructor(public navCtrl: NavController,
    private messages: Messages,
    private modalCtrl: ModalController,
    private socials: Socials
  ) {

  }

  ionViewDidLoad() {
    this.friends = this.messages.GetUsers();

    this.socials.GetMyFriends().then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addFriend() {
    this.navCtrl.push('AddFriendPage');
  }

  newGroup() {
    let modal = this.modalCtrl.create('NewFriendGroupPage');
    modal.onDidDismiss(() => {

    });
    modal.present();
  }

  groupList() {
    this.navCtrl.push('FriendGroupListPage');
  }

  openFriend(person)
  {
    this.navCtrl.push('FriendDetailPage', person);
  }

}
