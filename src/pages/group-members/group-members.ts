import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Messages } from '../../provider/Messages';

/**
 * Generated class for the GroupMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-members',
  templateUrl: 'group-members.html',
})
export class GroupMembersPage {

  members: any = [];
  group: any;
  constructor(public navCtrl: NavController, 
    // private messages: Messages,
    private events: Events,
    public navParams: NavParams) {
    // this.members = this.messages.GetUsers();
    this.group = this.navParams.data;
    if (this.group) {
      this.members = this.group.data || [];
    }
  }

  ionViewDidLoad() {
    this.events.subscribe('members:changed', (item) => {
      // let arr = item.data;
      if (this.group) {
        // this.group.data = this.group.data.concat(arr);

        this.members = this.group.data || [];
      }
    });
  }

  openDetail(item) {
    this.navCtrl.push('FriendDetailPage', item);
  }

  addMember() {
    this.navCtrl.push('MemberOperationPage', 
    { group: this.group, oper_type: 1 });
  }

}
