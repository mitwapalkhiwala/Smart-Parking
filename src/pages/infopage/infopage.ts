import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { HomePage } from '../home/home'; 
 
import { PlacesServiceProvider } from '../../providers/places-service/places-service';  
/** 
 * Generated class for the InfopagePage page. 
 * 
 * See http://ionicframework.com/docs/components/#navigation for more info 
 * on Ionic pages and navigation. 
 */ 
@IonicPage({ 
  segment: 'infopage' 
}) 
@Component({ 
  selector: 'page-infopage', 
  templateUrl: 'infopage.html', 
}) 
export class InfopagePage { 
     firstname: any; 
     lastname: any; 
     place: any; 
     lat: any; 
     lng: any; 
     address: any; 
     name: any; 
     price: any;
     placedata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private placesService: PlacesServiceProvider) { 
    this.firstname = navParams.get("firstname"); 
    this.lastname = navParams.get("lastname"); 
    this.place = navParams.get("place"); 
    this.lat = navParams.get("lat"); 
    this.lng = navParams.get("lng"); 
    this.address = navParams.get("address"); 
    this.name = navParams.get("name"); 
    this.price = navParams.get("price");
    this.placedata = navParams.get("available_places");
  } 
 
  ionViewDidLoad() { 
  } 
  backHome(){ 
    this.navCtrl.pop(); 
  } 
}  