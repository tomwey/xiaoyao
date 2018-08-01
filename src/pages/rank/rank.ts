import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  group: any;
  members: any = [];
  currentUser: any;

  rankType: string = '0';

  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
    // if (this.navParams.data) {
    //   this.members = this.navParams.data.data || [];
    // }

    this.group = this.navParams.data;

    // this.members.forEach(element => {
    //   let uid = element.friendid || element.uid || element.id;
    //   if (uid == Utils.getQueryString('uid')) {
    //     element.isMe = true;
    //     this.currentUser = element;
    //   }
    // });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RankPage');
    this.segmentChanged(null);
  }

  segmentChanged(ev) {
    this.socials.GroupRanks(this.rankType, this.group.id)
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          let arr = data['data'];

          let mime;
          arr.forEach(element => {
            let uid = element.friendid || element.uid || element.id;
            if (uid == Utils.getQueryString('uid')) {
              element.isMe = true;
              mime = element;
            }
          });
          this.members = arr;
          this.currentUser = mime;
        }
      })
      .catch(error => {
        // console.log(error);
        this.tools.showToast(error.message || '服务器出错了！');
      });
  }

  openDetail(item) {
    if (!item.isMe) {
      this.navCtrl.push('FriendDetailPage', item);
    }
  }

}
