import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the GroupGameSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-game-setting',
  templateUrl: 'group-game-setting.html',
})
export class GroupGameSettingPage {

  group: any;
  games: any = [];
  constructor(public navCtrl: NavController, 
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
      this.group = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GroupGameSettingPage');
    setTimeout(() => {
      this.loadGames();
    }, 100);
  }

  loadGames() {
    this.socials.GetGroupGame(this.group.id)
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          this.games = data['data'];
        }
      })
      .catch(error => {
        this.tools.showToast(error.message);
      })
  }

}
