import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the GroupInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-input',
  templateUrl: 'group-input.html',
})
export class GroupInputPage {

  content: any = '';
  title: any;
  action: any;
  group: any;
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
    if (this.navParams.data.content) {
      this.content = this.navParams.data.content;
    } 

    this.title = this.navParams.data.title;
    this.action = this.navParams.data.action;
    this.group = this.navParams.data.group;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupInputPage');
  }

  commit() {
    this.socials.UpdateGroupInfo(this.action, this.content, this.group.id)
      .then(data => {
        if (this.action == 'setGroupNick') {
          this.group.name = this.content;
        } else if (this.action == 'setGroupNotice') {
          this.group.notice = this.content;
        }
        
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || '提交出错了~');
      })
  }

}
