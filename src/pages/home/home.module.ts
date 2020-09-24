import { NgModule } from '@angular/core'; 
import { HomePage} from './home'; 
import { IonicPageModule } from 'ionic-angular'; 
import { HTTP } from '@ionic-native/http'; 
import { PlacesServiceProvider } from '../../providers/places-service/places-service';

@NgModule({ 
  declarations: [], 
  imports: [IonicPageModule.forChild(HomePage),
  HTTP], 
  entryComponents: [HomePage],
  providers: [PlacesServiceProvider]
}) 
export class HomePageModule { }