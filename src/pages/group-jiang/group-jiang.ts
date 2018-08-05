import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the GroupJiangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-jiang',
  templateUrl: 'group-jiang.html',
})
export class GroupJiangPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupJiangPage');
  }

  bindMobile() {
    // this.navCtrl.push('BindMobilePage');
    window.location.href = 'uniwebview://bindMobile?uid=' + Utils.getQueryString('uid');
  }

}
