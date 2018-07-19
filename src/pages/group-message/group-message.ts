import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-message',
  templateUrl: 'group-message.html',
})
export class GroupMessagePage {

  group: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupMessagePage');
  }

}
