import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the AbilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ability',
  templateUrl: 'ability.html',
})
export class AbilityPage {

  group: any;
  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public navParams: NavParams) {
      this.group = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbilityPage');
  }

  openAbility2() {
    let modal = this.modalCtrl.create('Ability2Page');
    modal.onDidDismiss((data) => {

    });
    modal.present();
  }

  // 设置诚意金
  setCYJ() {
    
  }

  // 副群主任命与撤销
  changeMaster2() {
    this.navCtrl.push('MemberOperationPage', { group: this.group, 
      oper_type: 4 });
  }

  // 群主转让
  changeMaster() {
    this.navCtrl.push('MemberOperationPage', { group: this.group, 
        oper_type: 3, 
        single_select: 1 });
  }

}
