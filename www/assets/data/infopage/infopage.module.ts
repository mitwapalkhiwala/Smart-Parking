import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfopagePage } from './infopage';
import { PeopleServiceProvider } from '../../providers/people-service/people-service';
@NgModule({
  declarations: [InfopagePage],
  imports: [IonicPageModule.forChild(InfopagePage)],
  exports: [InfopagePage],
  entryComponents: [InfopagePage],
  providers: [PeopleServiceProvider]
})
export class InfopagePageModule {}
