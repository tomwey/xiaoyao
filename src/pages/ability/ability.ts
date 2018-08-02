import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Socials } from '../../provider/Socials';
import { Tools } from '../../provider/Tools';

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
  ability: any = {
    p3: false,
    p4: false,
    p5: true,
    p6: true,
    p7: true,
    p8: true,
    p9: true,
    p10: true,
    p11: true
  };
  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private socials: Socials,
    private tools: Tools,
    public navParams: NavParams) {
      this.group = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AbilityPage');
    setTimeout(() => {
      this.loadPowers();
    }, 100);
  }

  loadPowers() {
    this.socials.GetGroupPower(this.group.id)
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          let arr = data['data'];
          if (arr.length > 0) {
            let item = arr[0];
            this.ability.p3 = item['inviteconfim'] == '1';
            this.ability.p4 = item['baninvite'] == '1';
            this.ability.p5 = item['baninviteconfim'] == '1';
            this.ability.p6 = item['bandelmeber'] == '1';
            this.ability.p7 = item['bannotice'] == '1';
            this.ability.p8 = item['bannick'] == '1';
            this.ability.p9 = item['banranking'] == '1';
            this.ability.p10 = item['baninvitelog'] == '1';
            this.ability.p11 = item['bangameseting'] == '1';

            // console.log(this.ability);
          }
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '加载出错了');
      })
  }

  openAbility2() {
    let modal = this.modalCtrl.create('Ability2Page', { ability: this.ability, group: this.group});
    modal.onDidDismiss((data) => {
      if (data) {
        // this.loadPowers();
      }
    });
    modal.present();
  }

  // 设置诚意金
  setCYJ() {
    this.navCtrl.push('MemberOperationPage', { group: this.group, 
      oper_type: 5 });
  }

  // 副群主任命与撤销
  handleVice(type) {
    this.navCtrl.push('MemberOperationPage', { group: this.group, 
      oper_type: 4, vice_param: type });
  }

  // 群主转让
  changeMaster() {
    this.navCtrl.push('MemberOperationPage', { group: this.group, 
        oper_type: 3, 
        single_select: 1 });
  }

  updateSettings(field) {
    let p3 = this.ability.p3 ? '1' : '0';
    let p4 = this.ability.p4 ? '1' : '0';
    this.socials.SetGroupPower(this.group.id, 
      p3,
      p4,
      this.ability.p5 ? '1' : '0',
      this.ability.p6 ? '1' : '0',
      this.ability.p7 ? '1' : '0',
      this.ability.p8 ? '1' : '0',
      this.ability.p9 ? '1' : '0',
      this.ability.p10 ? '1' : '0',
      this.ability.p11 ? '1' : '0'
    )
    .then(data => {

    })
    .catch(error => {
      this.tools.showToast(error.message || '服务器出错');
      this.ability[field] = !this.ability[field];
    });
  }

}
