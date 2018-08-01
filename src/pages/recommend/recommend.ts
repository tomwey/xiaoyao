import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the RecommendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html',
})
export class RecommendPage {

  friends: any = [];
  groups: any = [];
  userId: any;

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private socials: Socials,
    public navParams: NavParams) {
      this.userId = Utils.getQueryString('uid');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RecommendPage');
    setTimeout(() => {
      this.loadFriends();
      this.loadGroups();
    }, 100);
  }

  groupAvatar(group) {
    return "assets/imgs/to-user.jpg";
  }

  calcMemberCount(group) {
    // console.log(group);
    // console.log(this.groupData);
    if (!group) return 0;
    if (!group.data) return 0;

    return group.data.length;
    // let arr = this.groupData[group.id.toString()];
    // return arr.length;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  loadFriends() {
    this.socials.GetMyFriends()
      .then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
        }
      })
      .catch(error => {});
  }

  loadGroups() {
    this.socials.GetGroupInfo()
    .then(data => {
      if (data && data['data']) {
        this.groups = data['data'];
      }
    })
    .catch(error => {});
  }


}
