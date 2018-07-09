import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
  ) {

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

  friends: any = [
    {
      avatar: 'assets/imgs/logo.png',
      name: 'Darli&Uncle',
      ID: '227678',
      sex: 0,
    },
    {
      avatar: 'assets/imgs/logo.png',
      name: 'Tomwey',
      ID: '327278',
      sex: 1,
    },
    {
      avatar: 'assets/imgs/logo.png',
      name: '张三',
      ID: '227393',
      sex: 1,
    },
  ];

}
