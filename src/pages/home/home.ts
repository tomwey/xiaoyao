import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
// import { Messages } from '../../provider/Messages';
import { Socials } from '../../provider/Socials';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: any = [];

  groups: any = [];
  groupData: any = {};
  inviteFriends: any = [];
  constructor(public navCtrl: NavController,
    // private messages: Messages,
    private modalCtrl: ModalController,
    private events: Events,
    private socials: Socials
  ) {

  }

  ionViewDidLoad() {
    // this.friends = this.messages.GetUsers();
    this.events.subscribe('reload:friends', () => {
      this.loadMyFriends();
    });

    this.loadMyFriends();

    this.loadGroupInfos();

    this.loadInviteInfo();
  }

  loadInviteInfo() {
    this.socials.GetInviteInfo()
      .then(data => {
        console.log('#####');
        console.log(data);
        console.log('######');
        if (data && data['data']) {
          this.inviteFriends = data['data'];
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  openInviteApprove() {
    this.navCtrl.push("FriendInviteMessagePage", this.inviteFriends);
  }

  loadMyFriends() {
    this.socials.GetMyFriends().then(data => {
      console.log(data);
      if (data && data["data"]) {
        this.friends = data["data"];
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  loadGroupInfos() {
    this.socials.GetGroupInfo().then(data => {
      console.log(data);
      if (data && data['data']) {
        this.groups = data['data'];
      }

      this.groupData = data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  addFriend() {
    this.navCtrl.push('AddFriendPage');
  }

  newGroup() {
    let modal = this.modalCtrl.create('NewFriendGroupPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.loadGroupInfos();
      }
    });
    modal.present();
  }

  groupList() {
    this.navCtrl.push('FriendGroupListPage', this.groupData);
  }

  openFriend(person)
  {
    this.navCtrl.push('FriendDetailPage', person);
  }

}
