import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the BindMobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bind-mobile',
  templateUrl: 'bind-mobile.html',
})
export class BindMobilePage {

  user: any = {
    mobile: '',
    code: '',
  };

  codeText: any = '获取验证码';
  seconds: any = 60;
  disabled: boolean = false;

  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BindMobilePage');
  }

  getCode() {
    this.socials.GetCode(this.user.mobile)
      .then(data => {
        // console.log(data);
        this.tools.showToast('短信已发送');
        this.countDown();
      })
      .catch(error => {
        // console.log(error);
        this.tools.showToast(error.message || '发送验证码失败');
      });
  }

  countDown() {
    this.disabled = true;

    this.codeText = `倒计时${this.seconds}s`;
    this.seconds -= 1;
    if (this.seconds == -1) {
      this.codeText = '获取验证码';
      this.disabled = false;
      this.seconds = 60;
      return;
    }
    setTimeout(() => {
      this.countDown();
    }, 1000);
  }

  bind() {
    this.socials.BindMobile(this.user)
      .then(data => {
        if (data && data['data']) {
          let arr = data['data'];
          if (arr.length > 0) {
            let item = arr[0];
            if (item.code == 0) {
              this.tools.showToast('绑定成功');
              this.navCtrl.pop();
            } else {
              this.tools.showToast(item.msg);
            }
          } else {
            this.tools.showToast('未知错误');
          }
        } else {
          this.tools.showToast('未知错误');
        }
        
        // this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || '绑定失败');
      })
  }

}
