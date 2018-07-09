import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NewFriendGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-friend-group',
  templateUrl: 'new-friend-group.html',
})
export class NewFriendGroupPage {

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFriendGroupPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  done() {

  }

  selectPerson(person) {
    person.selected = !person.selected;
  }

  friends:any = [
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
