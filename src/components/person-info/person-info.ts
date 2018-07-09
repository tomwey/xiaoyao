import { Component, Input } from '@angular/core';

/**
 * Generated class for the PersonInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'person-info',
  templateUrl: 'person-info.html'
})
export class PersonInfoComponent {

  @Input('person') person?;

  constructor() {
    
  }

}
