import { NgModule } from '@angular/core';
import { PersonInfoComponent } from './person-info/person-info';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [PersonInfoComponent],
	imports: [
		IonicModule.forRoot(PersonInfoComponent)
	],
	exports: [PersonInfoComponent],
})
export class ComponentsModule {
	
}
