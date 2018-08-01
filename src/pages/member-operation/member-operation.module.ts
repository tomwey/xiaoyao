import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberOperationPage } from './member-operation';

@NgModule({
  declarations: [
    MemberOperationPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberOperationPage),
  ],
})
export class MemberOperationPageModule {}
