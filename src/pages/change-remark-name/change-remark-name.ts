import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangeRemarkNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-remark-name',
  templateUrl: 'change-remark-name.html',
})
export class ChangeRemarkNamePage {

  person: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.data;
    if (!this.person.note) {
      this.person.note = this.person.name;
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChangeRemarkNamePage');
  }

}
