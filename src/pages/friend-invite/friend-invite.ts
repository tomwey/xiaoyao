import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the FriendInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-invite',
  templateUrl: 'friend-invite.html',
})
export class FriendInvitePage {

  person: any;
  msg: string;
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
      this.person = this.navParams.data;
      this.msg = "我是" + Utils.getQueryString('nick');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendInvitePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.socials.AskAddFriend(this.person.friendid || this.person.id, this.msg)
    .then(data => {
      this.viewCtrl.dismiss(1).catch();
      this.tools.showToast('提交申请成功');
    })
    .catch(error => {
      this.tools.showToast('服务器出错了~');
    })
  }

}
