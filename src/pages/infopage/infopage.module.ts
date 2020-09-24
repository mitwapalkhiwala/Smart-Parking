import { NgModule } from '@angular/core'; 
import { IonicPageModule } from 'ionic-angular'; 
import { InfopagePage } from './infopage'; 
import { PlacesServiceProvider } from '../../providers/places-service/places-service';  

@NgModule({ 
  declarations: [], 
  imports: [IonicPageModule.forChild(InfopagePage)], 
 
  providers: [PlacesServiceProvider] 
}) 
export class InfopagePageModule {}  