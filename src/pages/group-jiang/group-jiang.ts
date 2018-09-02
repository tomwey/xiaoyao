import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

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

  mobileIsBind: boolean = false;
  group: any;
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
      this.group = this.navParams.data;

      this.events.subscribe('reload:check_mobile', () => {
        this.mobileIsBind = true;
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupJiangPage');
    // this.socials.MyComplain()
    // .then(data => {
    //   console.log(data);
    // });
    this.socials.CheckMobileBind()
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          let arr = data['data'];
          if (arr.length > 0) {
            this.mobileIsBind = arr[0]['isbind'] == '1';
          }
        }
      })
  }

  bindMobile() {
    if (!this.mobileIsBind) {
      this.navCtrl.push('BindMobilePage');
    } else {
      this.socials.UpgradeRegGroup(this.group.id)
        .then(data => {
          // console.log(data);
          let res = data['data'];
          if (res.length > 0) {
            let item = res[0];
            console.log(item);
            if (item.code.toString() == '0') {
              this.tools.showToast('操作成功!');
              this.navCtrl.pop();
            } else {
              this.tools.showToast(item.msg);
            }
          } else {
            this.tools.showToast('未知错误');
          }
        })
        .catch(error => {
          this.tools.showToast(error.message || '提交失败');
        });
    }
    
    // window.location.href = 'uniwebview://bindMobile?uid=' + Utils.getQueryString('uid');
  }

}
