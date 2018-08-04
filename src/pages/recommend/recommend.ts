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
  toUserId:any;
  initFriends: any = [];
  initGroups: any = [];

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private socials: Socials,
    public navParams: NavParams) {
      this.userId = Utils.getQueryString('uid');
      this.toUserId = this.navParams.data;
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

  selectItem(item) {

  }

  close() {
    this.viewCtrl.dismiss();
  }

  loadFriends() {
    this.socials.GetMyFriends()
      .then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
          this.initFriends = this.friends;
        }
      })
      .catch(error => {});
  }

  loadGroups() {
    this.socials.GetGroupInfo()
    .then(data => {
      if (data && data['data']) {
        this.groups = data['data'];
        this.initGroups = this.groups;
      }
    })
    .catch(error => {});
  }

  startSearch(kw) {
    console.log(kw);

    if (kw.trim() == '') {
      this.friends = this.initFriends;
      this.groups = this.initGroups;
      return;
    }

    this.friends = this.initFriends.filter(item => {
      let uid = item.friendid || item.uid || item.id;
      // console.log(uid);
      return item.nick.toLowerCase().indexOf(kw.trim().toLowerCase()) > -1 || 
            uid.indexOf(kw.trim().toLowerCase()) > -1;
    });

    this.groups = this.initGroups.filter(item => {
      let uid = item.id;
      // console.log(uid);
      return item.name.toLowerCase().indexOf(kw.trim().toLowerCase()) > -1 || 
            uid.indexOf(kw.trim().toLowerCase()) > -1;
    });
  }


}
