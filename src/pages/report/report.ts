import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  didChange(reason) {
    this.reasons.map(ele => {
      ele.value = false;
    });
    reason.value = true;
  }

  reasons: any = [
    {
      label: '发布不适当内容进行骚扰',
      value: true,
    },
    {
      label: '游戏过程中伙同他人作弊',
      value: false,
    },
    {
      label: '账号可能被盗用',
      value: false,
    },
    {
      label: '平台内容发布广告等信息进行诈骗',
      value: false,
    },
  ];

}
