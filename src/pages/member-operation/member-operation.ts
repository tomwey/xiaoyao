import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the MemberOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-operation',
  templateUrl: 'member-operation.html',
})
export class MemberOperationPage {

  group: any;
  operType: any;
  selectedItems: any = [];
  keyword: any = '';

  members: any = [];
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.group = this.navParams.data.group;
    this.operType = this.navParams.data.oper_type;

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MemberOperationPage');
    this.prepareMembers();
  }

  prepareMembers() {
    if (this.operType === 1) {
      // 添加
      this.socials.GetMyFriends()
        .then(data => {
          if (data && data['data']) {
            let friends = data['data'];
            this.fetchFriendsInGroup(friends);
          }  
        })
        .catch(error => {
          this.tools.showToast('获取牌友失败');
        });
    } else {
      // 删除
      let temp = this.group.data;
      let arr = [];
      temp.forEach(element => {
        if (element.uid != Utils.getQueryString('uid')) {
          arr.push(element);
        }
        element.selected = false;
      });

      this.members = arr;
    }
  }

  done() {
    let action = this.operType == 1 ? 'addMember' : 'delMember';
    let ids = [];
    this.selectedItems.forEach(element => {
      ids.push(element.friendid || element.uid || element.id);
    });
    this.socials.MemberOperation(action, this.group.id, ids)
      .then(data => {
        this.updateGroupMembers();
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || error);
      });
  }

  updateGroupMembers() {
    // if (this.operType == 2) { // 删除成员
    //   this.selectedItems.forEach(element => {
    //     let index = this.group.data.indexOf(element);
    //     if (index != -1) {
    //       this.group.data.splice(index, 1);
    //     }
    //   });
    // } else {
    //   // 添加
    //   let arr = this.group.data;
    //   this.group.data = arr.concat(this.selectedItems);
    // }
    this.events.publish('members:changed', { data: this.selectedItems, type: this.operType });
  }

  selectItem(person) {
    if (this.operType == 1) {
      // 添加
      if (!person.joined) {
        this.addPerson(person);
      }
    } else {
      // 删除
      this.addPerson(person);
    }
  }

  addPerson(person) {
    person.selected = !person.selected;
    if (person.selected) {
      this.selectedItems.push(person);
    } else {
      let index = this.selectedItems.indexOf(person);
      if (index != -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  fetchFriendsInGroup(friends) {
    let temp = this.group.data;
    friends.forEach(friend => {
      temp.forEach(member => {
        if (friend.friendid == member.uid) {
          friend.joined = true;
        }
      });
    });
    this.members = friends;
  }

  startSearch(kw) {

  }
}
