import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangeEarnestMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-earnest-money',
  templateUrl: 'change-earnest-money.html',
})
export class ChangeEarnestMoneyPage {

  money: any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChangeEarnestMoneyPage');
  }

}
