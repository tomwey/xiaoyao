import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

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

  ability: any;
  group: any;
  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
      this.ability = this.navParams.data.ability;
      this.group = this.navParams.data.group;
      this.blackList = [
        {
          label: '禁止使用邀请确认',
          field: 'p5',
          value: this.ability.p5,
        },
        {
          label: '禁止移除群成员',
          value: this.ability.p6,
          field: 'p6',
        },
        {
          label: '禁止修改公告',
          value: this.ability.p7,
          field: 'p7',
        },
        {
          label: '禁止修改群昵称',
          value: this.ability.p8,
          field: 'p8',
        },
        {
          label: '禁止使用排行功能',
          value: this.ability.p9,
          field: 'p9',
        },
        {
          label: '禁止使用邀请日志功能',
          value: this.ability.p10,
          field: 'p10',
        },
        {
          label: '禁止使用群游戏设置',
          value: this.ability.p11,
          field: 'p11',
        },
      ];

      console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ability2Page');
  }

  changeCB(ev, item) {
    // console.log(ev);
    // console.log(item);
    this.ability[item.field] = item.value;
  }

  done() {
    this.socials.SetGroupPower(this.group.id,
      this.ability.p3 ? '1' : '0',
      this.ability.p4 ? '1' : '0',
      this.ability.p5 ? '1' : '0',
      this.ability.p6 ? '1' : '0',
      this.ability.p7 ? '1' : '0',
      this.ability.p8 ? '1' : '0',
      this.ability.p9 ? '1' : '0',
      this.ability.p10 ? '1' : '0',
      this.ability.p11 ? '1' : '0')
      .then(data => {
        this.viewCtrl.dismiss(1);
      })
      .catch(error => {
        this.tools.showToast(error.message);
      })
  }

  close() {
    this.viewCtrl.dismiss();
  }

  blackList: any;

}
