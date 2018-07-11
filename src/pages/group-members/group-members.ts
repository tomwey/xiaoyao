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
  constructor(public navCtrl: NavController, 
    private messages: Messages,
    public navParams: NavParams) {
    // this.members = this.messages.GetUsers();

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupMembersPage');
    this.prepareData();
  }

  prepareData() {
    const arr = this.messages.GetUsers();
    
    let outerTemp = [];
    const cols = 5;
    const rows = (arr.length + cols - 1) / cols;

    for (var i=0; i<rows; i++) {
      let temp = [];
      for (var j=0; j<cols; j++) {
        const index = i * cols + j;
        if (index < arr.length) {
          temp.push(arr[index]);
        } else {
          temp.push({ avatar: '' });
        }
      }
      outerTemp.push(temp);
    }
    this.members = outerTemp;
  }

}
