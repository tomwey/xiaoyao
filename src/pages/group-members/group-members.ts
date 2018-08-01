import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams) {
    // this.members = this.messages.GetUsers();
    this.group = this.navParams.data;
    if (this.group) {
      this.members = this.group.data || [];
    }
  }

  ionViewDidLoad() {
    
  }

  openDetail(item) {
    this.navCtrl.push('FriendDetailPage', item);
  }

  addMember() {
    this.navCtrl.push('MemberOperationPage', 
    { group: this.group, oper_type: 1 });
  }

}
