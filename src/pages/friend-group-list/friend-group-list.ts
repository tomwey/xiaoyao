import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { MessagePage } from '../message/message';

/**
 * Generated class for the FriendGroupListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-group-list',
  templateUrl: 'friend-group-list.html',
})
export class FriendGroupListPage {

  groups: any;
  groupData: any;
  userId: any;
  constructor(public navCtrl: NavController, 
    private events: Events,
     public navParams: NavParams) {
    this.groups = this.navParams.data['data'];
    this.groupData = this.navParams.data;

    this.userId = Utils.getQueryString('uid');

    // console.log(this.groupData);
    this.events.subscribe('group:removed', (group) => {
      for (var index = 0; index < this.groups.length; index++) {
        if (group.id == this.groups[index].id) {
          this.groups.splice(index,1);
          break;
        }
      }
      // let index = this.groups.indexOf(group);
      // if (index != -1) {
      //   this.groups.splice(index, 1);
      // }
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendGroupListPage');
  }

  groupAvatar(group) {
    return "assets/imgs/to-user.jpg";
  }

  openGroup(group) {
    // if (Utils.getQueryString('test')) {
      this.navCtrl.push(MessagePage, { fullscreen: '2', 
                                       roomtype: '0', 
                                       toname: `${group.name}(${group.membercount})`,
                                       toid: group.id });
    //   return;
    // }
    
    // let fromId = Utils.getQueryString('uid');
    // let fromName = Utils.getQueryString('nick');
    // let toName = `${group.name}(${group.membercount})`;
    // window.location.href = `uniwebview://openGroup?uid=${fromId}&nick=${fromName}&fullscreen=0&roomid=&roomtype=0&toid=${group.id}&toname=${toName}&page=message`;
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


}
