import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Socials } from '../../provider/Socials';

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
  group: any;
  data: any = [];
  constructor(public navCtrl: NavController, 
    private tools: Tools,
    private socials: Socials,
    public navParams: NavParams) {
    this.data = this.navParams.data.data;
    this.group = this.navParams.data.group;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChangeEarnestMoneyPage');
  }

  done() {
    if (this.money > 1000000000) {
      this.tools.showToast('诚意金不能大于1000000000');
      return;
    }

    let destids = [];
    this.data.forEach(element => {
      destids.push(element.friendid || element.uid || element.id);
    });

    this.socials.SetEarnestMoney(this.group.id, destids, this.money)
      .then(data => {
        this.data.forEach(element => {
          element.earnestmoney = this.money.toString();
          element.selected = false;
        });
    
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast('设置失败！');
      })
  }

}
