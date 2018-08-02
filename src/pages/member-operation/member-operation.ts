import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Searchbar, AlertController } from 'ionic-angular';
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
  initData: any = [];
  isSingleSelect: boolean = false;

  title: string = '';
  btnTitle: string = '确定';

  viceType: any;
  @ViewChild('searchBar') searchBar: Searchbar;
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    private events: Events,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.group = this.navParams.data.group;
    this.operType = this.navParams.data.oper_type;

    this.viceType = this.navParams.data.vice_param || '';
    
    this.isSingleSelect = this.navParams.data.single_select == 1;

    switch(this.operType) {
      case 1:
        this.title = '添加成员';
        break;
      case 2:
      this.title = '删除成员';
        break;
      case 3:
        this.title = '群主转让';
        break;
      case 4:
        this.title = this.viceType == 1 ? '任命副群主' : '撤销副群主';
        break;
      case 5:
        this.title = '设置诚意金';
        break;
      default:
        this.title = '';
        break;
    }

    if (this.operType == 2) {
      this.btnTitle = '删除';
    } else if (this.operType == 5) {
      this.btnTitle = '设置';
    }
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
    } else if (this.operType == 4) {
      // 副群主撤销与任命
      let temp = this.group.data;
      let arr = [];

      if (this.viceType == 1) {
        // 任命
        temp.forEach(element => {
          if (element.roletype == '9') {
            arr.push(element);
          }
          element.selected = false;
        });

      } else {
        // 撤销
        temp.forEach(element => {
          if (element.roletype == '2') {
            arr.push(element);
          }
          element.selected = false;
        });
      }
      this.members = arr;
      this.initData = this.members;
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
      this.initData = this.members;

      // console.log(this.members);
    }
  }

  setCYJ() {
    this.navCtrl.push('');
  }

  done() {
    let action;
    if ( this.operType == 1 ) {
      action = 'addMember';
    } else if ( this.operType == 2 ) {
      action = 'delMember';
    } else if (this.operType == 4) {
      // 副群主任命与撤销
      action = 'setViceGroupMGR';
    } else if (this.operType == 5)  {
      this.setCYJ();
      return;
    }

    if (!action) return;

    let ids = [];
    this.selectedItems.forEach(element => {
      ids.push(element.friendid || element.uid || element.id);
    });

    if (this.operType == 4) {
      this.socials.SetViceGroupMGR(this.group.id, ids.join(','), this.viceType.toString())
        .then(data => {
          this.selectedItems.forEach(element => {
            element.roletype = this.viceType == 1 ? '2' : '9';
          });
          this.updateGroupMembers();
          this.navCtrl.pop();
        })
        .catch(error => {
          this.tools.showToast(error.message || error);
        });
    } else {
      this.socials.MemberOperation(action, this.group.id, ids)
      .then(data => {
        this.updateGroupMembers();
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || error);
      });
    }

    
  }
s
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
    } else if (this.operType == 3) { // 转让群主
      this.alertCtrl.create({
        title: '',
        subTitle: '转让群主后不可撤销，是否继续将群主转让给[' + person.nick + ']',
        buttons: [
          {
            text: '取消',
            role: 'Cancel'
          },
          {
            text: '确定',
            handler: () => {
              this.doTransmit(person);
            }
          }
        ]
      }).present();
    } else {
      // 删除
      this.addPerson(person);
    }
  }

  doTransmit(person) {
    let uid = person.friendid || person.uid || person.id;
    this.socials.ChangeGroupMGR(this.group.id, uid)
      .then(data => {
        this.group.master_id = uid;
        person.roletype = '1';
        this.events.publish('reload:group',uid);
        
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
      })
      .catch(error => {
        this.tools.showToast(error.message || '转让出错了');
      });
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
      // console.log(`--> ${JSON.stringify(friend)}`);
      
      temp.forEach(member => {
        // console.log(member.uid);
        if (friend.friendid == (member.uid || member.friendid)) {
          friend.joined = true;
        }
      });
    });
    this.members = friends;
    this.initData = this.members;
  }

  startSearch(kw) {
    console.log(kw);

    if (kw.trim() == '') {
      this.members = this.initData;
      return;
    }

    this.members = this.initData.filter(item => {
      let uid = item.friendid || item.uid || item.id;
      console.log(uid);
      return item.nick.toLowerCase().indexOf(kw.trim().toLowerCase()) > -1 || 
            uid.indexOf(kw.trim().toLowerCase()) > -1;
    });
  }

  hideKeyboard() {
    
  }
}
