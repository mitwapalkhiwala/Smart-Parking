import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { PlacesServiceProvider } from '../../providers/places-service/places-service';   
import { Geolocation } from '@ionic-native/geolocation'; 
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder'; 
import { Storage } from '@ionic/storage';  
 
 
@IonicPage() 
@Component({ 
  selector: 'page-history', 
  templateUrl: 'history.html', 
}) 
export class HistoryPage { 
  places: any = []; 
 
  constructor( 
   public navCtrl: NavController, 
   public navParams: NavParams,   
   private placesService: PlacesServiceProvider,  
   public geolocation: Geolocation,  
   public geocoder: NativeGeocoder,  
   private storage: Storage 
   ) {  
    this.history(); 
  } 
 
  ionViewDidLoad() { 
   console.log('ionViewDidLoad HistoryPage'); 
   this.getLocation();  
 } 
 
 getLocation() {  
  this.storage.get('historyLat').then((historylat) => 
   { let length = historylat.length; 
    console.log('historyLat: ',historylat); 
    this.storage.get('historyLng').then((historylng) => 
    { 
     console.log('historyLng: ',historylng); 
     this.storage.get('historyDate').then((date1)=> 
     { 
       console.log('date: ', date1); 
 
       this.storage.get('historyTime').then((time1)=> 
       { 
         console.log('time: ', time1); 
 
          
         for(let count=0;count<=length;count++){ 
           this.geocoder.reverseGeocode(historylat[count], historylng[count]) 
           .then((result: NativeGeocoderReverseResult) => { 
            this.places.push({ 
              "house": result.houseNumber, 
              "street": result.street, 
              "city": result.city, 
              "district": result.district, 
              "country": result.countryName, 
              "time": time1[count], 
              "date": date1[count] 
            }); 
            this.storage.set('places',this.places); 
            console.log('Address:  ' +this.places[count].street + ', ' +this.places[count].city +', '+this.places[count].country+', '+this.places[count].district+', '+this.places[count].house); 
            console.log('Date&time:  ' +this.places[count].date + ', ' +this.places[count].time1); 
          }) 
           .catch((error: any) => console.log(error)) 
         } 
       
       }) 
}) 
}) 
 
}) 
} 
 
history(){ 
  this.storage.get('places'); 
} 
 
removeHistory() 
{  
  this.places=[]; 
  this.storage.remove('historyLat'); 
  this.storage.remove('historyLng'); 
  this.storage.remove('historyDate'); 
  this.storage.remove('historyTime'); 
  this.storage.remove('places'); 
} 
}  