import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

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
    private messages: Messages,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFriendGroupPage');
    this.friends = this.messages.GetUsers();
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
  ];
}
