import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: any = [];

  constructor(public navCtrl: NavController,
    private messages: Messages,
    private modalCtrl: ModalController,
  ) {

  }

  ionViewDidLoad() {
    this.friends = this.messages.GetUsers();
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
