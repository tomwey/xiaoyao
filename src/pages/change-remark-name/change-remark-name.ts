import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the ChangeRemarkNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-remark-name',
  templateUrl: 'change-remark-name.html',
})
export class ChangeRemarkNamePage {

  person: any;
  remarkName: any;

  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
    this.person = this.navParams.data;
    // if (!this.person.descname || this.person.descname == 'NULL') {
    //   this.remarkName = this.person.nick;
    // } else {
    //   this.remarkName = this.person.descname;
    // }
    this.remarkName = this.person.descname;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChangeRemarkNamePage');
  }

  update() {
    this.socials.UpdatePersonNoteName(this.remarkName, this.person.friendid || this.person.id)
      .then(data => {
        this.person.descname = this.remarkName;
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast('修改备注失败');
      });
  }

}
