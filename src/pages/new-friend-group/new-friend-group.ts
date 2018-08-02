import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';
// import { Messages } from '../../provider/Messages';

/**
 * Generated class for the NewFriendGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-friend-group',
  templateUrl: 'new-friend-group.html',
})
export class NewFriendGroupPage {

  group: any = {
    nickname: '',
    grouptype: '1',
    members: []
  };
  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    // private messages: Messages,
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewFriendGroupPage');
    // this.friends = this.messages.GetUsers();
    setTimeout(() => {
      this.socials.GetMyFriends().then(data => {
        if (data && data['data']) {
          this.friends = data['data'];
        }
      })
      .catch(error => {

      });
    }, 300);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  selectType(type) {
    this.group.grouptype = type;
  }

  done() {
    let memberids = [];
    this.group.members.forEach(person => {
      memberids.push(`${person.friendid || person.id}`)
    });

    if (this.group.nickname.length == 0) {
      this.tools.showToast('群名称必填')
      return;
    }

    if (memberids.length == 0) {
      this.tools.showToast('必须至少选择一个成员')
      return;
    }

    this.socials.AddGroup(this.group.nickname, this.group.grouptype, memberids.join(','))
      .then(data => {
        // console.log(data);
        this.viewCtrl.dismiss(1).catch();
      })
      .catch(error => {
        // console.log(error);
        setTimeout(() => {
          this.tools.showToast("群创建失败~");
        }, 200);
        
      });
    // console.log(JSON.stringify(this.group));
  }

  selectPerson(person) {
    person.selected = !person.selected;

    if (person.selected) {
      this.group.members.push(person);
    } else {
      let index = this.group.members.indexOf(person);
      if (index !== -1) {
        this.group.members.splice(index, 1);
      }
    }
  }

  friends:any = [
  ];
}
