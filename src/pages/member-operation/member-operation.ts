import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MemberOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-operation',
  templateUrl: 'member-operation.html',
})
export class MemberOperationPage {

  group: any;
  operType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group = this.navParams.data.group;
    this.operType = this.navParams.data.oper_type;


  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MemberOperationPage');
  }

}
