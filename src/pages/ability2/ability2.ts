import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Ability2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ability2',
  templateUrl: 'ability2.html',
})
export class Ability2Page {

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ability2Page');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  blackList: any = [
    {
      label: '禁止使用邀请确认',
      value: true,
    },
    {
      label: '禁止移除群成员',
      value: true,
    },
    {
      label: '禁止修改公告',
      value: true,
    },
    {
      label: '禁止修改群昵称',
      value: true,
    },
    {
      label: '禁止使用排行功能',
      value: true,
    },
    {
      label: '禁止使用邀请日志功能',
      value: true,
    },
    {
      label: '禁止使用群游戏设置',
      value: true,
    },
  ];

}
