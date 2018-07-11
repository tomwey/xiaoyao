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

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public navParams: NavParams) {
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

}
