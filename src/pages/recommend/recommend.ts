import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RecommendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html',
})
export class RecommendPage {

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
