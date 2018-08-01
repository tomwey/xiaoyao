import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the FriendInviteMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-invite-message',
  templateUrl: 'friend-invite-message.html',
})
export class FriendInviteMessagePage {

  inviteMessages: any = [];
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
    this.inviteMessages = this.navParams.data;

    this.inviteMessages.forEach(item => {
      item.msgcontent = JSON.parse(item.msgcontent);
    })
    console.log(this.inviteMessages);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FriendInvitePage');
  }

  reject(msg) {
    this.handleInviteMessage("disAgreeAddFriend",msg);
  }

  agree(msg) {
    this.handleInviteMessage("agreeAddFriend",msg);
  }

  handleInviteMessage(action, msg) {
    this.socials.HandleInviteMessage(action, msg.id)
      .then(data => {
        let index = this.inviteMessages.indexOf(msg);
        if (index !== -1) {
          this.inviteMessages.splice(index, 1);
        }
      })
      .catch(error => {
        console.log(error);
        this.tools.showToast(error.message || error);
      });
  }

}
