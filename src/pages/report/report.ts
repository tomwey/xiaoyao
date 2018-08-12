import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

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

  person: any;
  currentReason: any = null;
  note: string = '';
  groupid: any;
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
      this.person = this.navParams.data.person;
      this.groupid = this.navParams.data.groupid;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReportPage');
    this.currentReason = this.reasons[0];
  }

  didChange(reason) {
    this.reasons.map(ele => {
      ele.value = false;
    });
    reason.value = true;
    this.currentReason = reason;
  }

  commit() {
    console.log(this.person);
    this.socials.Report(this.person.friendid || this.person.uid || this.person.id,this.currentReason.ID,this.groupid,this.note)
      .then(data => {
        // console.log(data);
        let arr = data['data'];
        if (arr.length > 0) {
          let item = arr[0];
          if (item.code == '0') {
            this.tools.showToast('投诉成功');
            this.navCtrl.pop();
          } else {
            this.tools.showToast(item.msg);
          }
        } else {
          this.tools.showToast('未知错误');
        }
      })
      .catch(error => {
        this.tools.showToast('投诉失败');
      })

  }

  reasons: any = [
    {
      label: '发布不适当内容进行骚扰',
      value: true,
      ID: '1',
    },
    {
      label: '游戏过程中伙同他人作弊',
      value: false,
      ID: '2'
    },
    {
      label: '账号可能被盗用',
      value: false,
      ID: '3',
    },
    {
      label: '平台内容发布广告等信息进行诈骗',
      value: false,
      ID: '4'
    },
  ];

}
