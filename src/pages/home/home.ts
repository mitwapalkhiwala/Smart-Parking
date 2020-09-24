import { Component, ViewChild, ElementRef } from '@angular/core';   
import { IonicPage } from 'ionic-angular';   
import { NavController, AlertController, Platform } from 'ionic-angular';   
import { Geolocation } from '@ionic-native/geolocation';  
import { PlacesServiceProvider } from '../../providers/places-service/places-service';  
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network'; 
import { InfopagePage } from '../infopage/infopage'; 
import { HistoryPage } from '../history/history'; 
//import * as $ from 'jquery'; 
declare var MarkerClusterer: any;
declare var google;   
declare var navigator: any; 
declare var Connection: any;  

@IonicPage({
  segment: 'homepage'
})   
@Component({   
  selector: 'page-home',   
  templateUrl: 'home.html',   
  providers: [PlacesServiceProvider]  
})   
export class HomePage {   
  infopage = InfopagePage; 
  @ViewChild('map') mapElement: ElementRef;   
  map: any;   
  places: any = [];  
  init_places: any = [];  
  pSpot: any = [];
  historyLat: any = [];
  historyLng: any = [];
  historyDate: any = [];
  historyTime: any = [];
  trig: boolean = false; 
  currentLat: any;
  currentLng: any;
  latitude: any;
  longitude: any;
  infowindow: any;
  prevInfo: any = null;
  markers: any = [];
  lat: any;
  lng: any;
  date: any;
  time: any;
  date1: any;
  time1: any;
  val1: any;
  mytime: any;
  newtime: any;
  time_diff: any;
  time_diff_minutes: any;
  pricehere: any;
  distance: number;
  value_parking: any;
  loginid: any;
  directionsDisplay = new google.maps.DirectionsRenderer;   
  directionsService = new google.maps.DirectionsService; 
  markers_1: any = [];
  search_term:string = '';
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private placesService: PlacesServiceProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    private network: Network,
    public platform: Platform){ 
    this.loadPlaces(); 
    this.infopage = InfopagePage; 
    this.history();
    setTimeout(()=>{ this.initMap(); }, 4000); 
    this.storage.get('loginid').then((val) =>{
      this.loginid =val;
      console.log('user logged in is ',this.loginid)
    })
  }

  ionViewDidLoad(){ 
    this.loadPlaces();   
  }   

  network1(){ 
    this.network.onDisconnect().subscribe(() => { 
      console.log('network was disconnected :-('); 
    }); 
  } 
  history(){ 
  this.storage.get('historyLat').then((lat1)=>{ 
    for(let count=0;count<lat1.length;count++){ 
        this.historyLat.push(lat1[count]); 
    } 
       console.log('past lat: ', this.historyLat); 
  }) 
  this.storage.get('historyLng').then((lng1)=>{ 
    for(let count=0;count<lng1.length;count++){ 
        this.historyLng.push(lng1[count]); 
    } 
    console.log('past lng: ', this.historyLng); 
  }) 
  this.storage.get('historyDate').then((date1)=>{ 
    for(let count=0;count<date1.length;count++){ 
        this.historyDate.push(date1[count]); 
    } 
       console.log('past date: ', this.historyDate); 
  }) 
  this.storage.get('historyTime').then((time1)=>{ 
    for(let count=0;count<time1.length;count++){ 
        this.historyTime.push(time1[count]); 
    } 
       console.log('past time: ', this.historyTime); 
  }) 
 }

  checkNetwork() { 
    this.platform.ready().then(() => { 
      if(this.network.type != "none") { 
        let alert = this.alertCtrl.create({ 
          title: "<center>YEAHHH...</center>", 
          subTitle: "<center>You have Active Internet Connection</center>", 
          buttons: ["OK"] 
        }); 
        alert.present(); 
      } 

      if(this.network.type == "none") { 
        let alert = this.alertCtrl.create({ 
          title: "<center>SORRY..</center>", 
          subTitle: "<center>NO Internet Connection, Please try again</center>", 
          buttons: ["OK"] 
        }); 
        alert.present(); 
      } 
    }); 
  } 

  navigate(lat1,lng1,name1,add1,price,slots) { 
    this.navCtrl.push(InfopagePage, { 
      name: name1, 
      address: add1, 
      place: this.places, 
      lat: lat1, 
      lng: lng1, 
      price: price,
      available_places: slots,
      firstname: "Nic", 
      lastname: "Raboy" 
    }); 
  }

  /*showHistory(){
      this.navCtrl.push(HistoryPage, { 
      latitude: this.historyLat,
      longitude: this.historyLng
    }); 
   this.navCtrl.pop();
  }*/
  loadPlaces(){  
    this.placesService.load()  
    .then(data => {  
      this.places = data;
      this.init_places = data;
    });  
    
  }  
  triggerFunc(){ 
    this.trig = true; 
  } 
  triggerFunc2(){ 
    this.trig = false; 
  } 

  initMap() {   
    this.geolocation.getCurrentPosition().then((resp) => {     
      this.map = new google.maps.Map(this.mapElement.nativeElement, {   
        draggable: true, 
        zoom: 15,   
         //center: {lat:resp.coords.latitude , lng:resp.coords.longitude}
         center: {lat: 43.091461, lng: -79.047150} 
      });   
      let marker =  new google.maps.Marker({   
        map: this.map,   
        draggable: false,   
        position: {lat: 43.091461, lng: -79.047150} //position: {lat: resp.coords.latitude, lng: resp.coords.longitude} 
      });   
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.currentLat = 43.091461;
      this.currentLng = -79.047150;

      if(this.places != undefined) 
      { 
        for(let count = 0;count<this.places.length;count++){  
          this.addMarker1(this.places[count].lat, this.places[count].lng, this.places[count].location_name, this.places[count].address);
          
        } 
        console.log('markers array is ',this.markers_1); 
      }   
      var styles = [{
        url: 'assets/data/img11.png',
        height: 40,
        width: 40,
        textColor: '#ff00ff',
        textSize: 10
      }];
      console.log('markers array is bbbb',this.markers_1); 
      var markerCluster  = new MarkerClusterer(this.map,this.markers_1, {
        styles: styles
      });    

      this.directionsDisplay.setMap(this.map);   
      this.directionsDisplay.setOptions( { suppressMarkers: true } ); 
    });  
  }   


addMarker1(lat1, lng1,content1, address1){  
  let image = {
    url: "assets/icon/marker.png",
    scaledSize : new google.maps.Size(40,40),
  };
  let marker = new google.maps.Marker({   
    map: this.map,   
    draggable: false,  
    icon: image,
    animation: google.maps.Animation.DROP,   
    position: {lat: lat1, lng: lng1}  
  });      
  this.markers_1.push(marker);
  this.markers.push(marker);
  this.addInfoWindow1(marker, content1, address1);  
}   

addInfoWindow1(marker, content1, address1){ 
  this.prevInfo = new google.maps.InfoWindow();
  let infoWindow = new google.maps.InfoWindow({  
    content: '<b> ' + content1 + '</b><br>' + address1
  });  
  marker.addListener('click', () => { 
    let lat1 = marker.getPosition().lat(); 
    let lng1 = marker.getPosition().lng(); 
    console.log('latitude of marker'+lat1.toFixed(6)+' longitude of marker '+lng1.toFixed(6));   
    for(let count = 0;count<this.places.length;count++){  
      console.log('latitude of '+count+ ' element is '+this.places[count].lat.toFixed(6) + ' and longitude is '+this.places[count].lng.toFixed(6)); 
      if(lat1.toFixed(6) == this.places[count].lat.toFixed(6) && lng1.toFixed(6) == this.places[count].lng.toFixed(6)){ 
        let name1 = this.places[count].location_name; 
        let add1 = this.places[count].address; 
        let price1 = this.places[count].price;
        let slots1 = this.places[count].available_spots;
        console.log('name is '+name1+' address is '+add1); 
        this.navigate(marker.getPosition().lat(),marker.getPosition().lng(),name1,add1,price1,slots1); 
        return 
      } 
    }  
    if(this.prevInfo !== null){
      this.prevInfo.close();
      this.prevInfo = infoWindow
    }  
    infoWindow.open(this.map, marker); 
    google.maps.event.addListener(this.map, 'click',() => { 
      infoWindow.close(this.map); 
    }) 

  });       
}   

getItems(ev: any) {  

    // set val to the value of the ev target  
    var val = ev.target.value;  
   
    // if the value is an empty string don't filter the items  
    if (val && val.trim() != '') {  
      this.places = this.init_places.filter((item) => {  
        console.log('.............',item.location_name); 
        this.triggerFunc(); 
        console.log('trig value is ',this.trig); 
        return (item.location_name.toLowerCase().indexOf(val.toLowerCase()) > -1); 
      })  
    } 
    else{
       this.triggerFunc2(); 
       this.loadPlaces();   
    }
  }  
  onCancelSearchbar(ev) { 
   this.triggerFunc2(); 
   console.log('empty');   
   this.loadPlaces();   
 }  

 newfunc() { 
  console.log('clear'); 
} 

getMarkerAt(lat1,lng1,name,add){  
  /*console.log(name);
  console.log(jQuery(".ion-searchbar"));*/
  this.search_term = name;
  let image = {
    url: "assets/icon/marker.png",
    scaledSize : new google.maps.Size(40,40),
  };
  let marker = new google.maps.Marker({   
    map: this.map,   
    icon: image,
    draggable: false,    
    position: {lat: lat1, lng: lng1}  
  });      

  let mycontent = '<div id ="contenty" ><b>Parking Location Name is </b> ' + name + '<br>   <b> Address is </b>' + add +'</div> ';  
  let infoWindow = new google.maps.InfoWindow({ 
    content: mycontent,
    maxWidth: 200
  }); 
  console.log('......',name); 
  console.log('lat is  '+lat1+' lng is '+lng1); 
  let __this:any= this;
  google.maps.event.addListener(infoWindow, 'domready', function() { 
    var ab = document.getElementById("contenty"); 
    ab.addEventListener('click' , () => { 
      console.log('insider',__this);      
      __this.testing();
      let lat1 = marker.getPosition().lat(); 
      let lng1 = marker.getPosition().lng(); 
      console.log('latitude of marker'+lat1.toFixed(6)+' longitude of marker '+lng1.toFixed(6));   
      for(let count = 0;count<__this.places.length;count++){  
        console.log('latitude of '+count+ ' element is '+__this.places[count].lat.toFixed(6) + ' and longitude is '+__this.places[count].lng.toFixed(6)); 
        if(lat1.toFixed(6) == __this.places[count].lat.toFixed(6) && lng1.toFixed(6) == __this.places[count].lng.toFixed(6)){ 
          let name1 = __this.places[count].location_name; 
          let add1 = __this.places[count].address; 
          let price1 = __this.places[count].price;
          let slots1 = __this.places[count].available_spots;
          console.log('name is '+name1+' address is '+add1); 
          __this.navigate(marker.getPosition().lat(),marker.getPosition().lng(),name1,add1,price1,slots1); 
          return 
        } 
      }  
    }); 
  }); 
  google.maps.event.addListener(this.map, 'click',() => { 
    infoWindow.close(this.map); 
  })  
  if(this.prevInfo !== null){
    this.prevInfo.close(); 
    this.prevInfo = infoWindow;
  }
  infoWindow.open(this.map, marker);   
  this.triggerFunc2(); 
} 
saveLocation(){ 
  this.directionsDisplay.setMap(); 
  if(this.infowindow){ 
    this.infowindow.close(); 
  } 
  if(this.pSpot.length>0){ 
    this.pSpot[0].setMap(null); 
  } 
  this.pSpot = []; 
   
  for(let count=0;count<this.markers.length;count++){ 
    this.markers[count].setMap(null); 
  } 
  this.geolocation.getCurrentPosition().then((resp) => {   
    this.time = new Date().toTimeString().substring(0,5); 
    this.date = new Date().toISOString().substring(0,10); 
    console.log('latitude of my location is ',resp.coords.latitude);   
    console.log('longitude of my location is ',resp.coords.longitude);   
    this.storage.set('latitude', resp.coords.latitude); 
    this.storage.set('longitude', resp.coords.longitude); 
    this.storage.set('time', this.time); 
    this.storage.set('date', this.date); 
    this.historyLat.push(resp.coords.latitude); 
    this.historyLng.push(resp.coords.longitude); 
    this.historyDate.push(this.date); 
    this.historyTime.push(this.time); 
    this.storage.set('historyLat', this.historyLat); 
    this.storage.set('historyLng', this.historyLng); 
    this.storage.set('historyDate', this.historyDate); 
    this.storage.set('historyTime', this.historyTime); 
    console.log(this.historyLat, this.historyLng); 
    let alert = this.alertCtrl.create({ 
      title: '<center>Hurray!</center>', 
      subTitle: '<center>Your Parking Spot has been saved successfully.</center>', 
      buttons: ['OK'] 
    }); 
    alert.present(); 
  }); 
} 


showLocation(){
  for(let count=0;count<this.markers.length;count++){
    this.markers[count].setMap(null);
    console.log(this.markers);
  }
  let image = {
    url: "assets/icon/red-car.png",
    scaledSize : new google.maps.Size(40,25)
  }; 
  let newtime = new Date();

  this.storage.get('latitude').then((val) => { //where car is parked
    this.latitude = 40.757634415004;
    console.log('latitude is', this.latitude);
    this.storage.get('longitude').then((value) => {
      this.longitude = -73.988395910783;
      console.log('longitude is', this.longitude);
      for(let count = 0;count<this.places.length;count++){  
        console.log('latitude of '+count+ ' element is '+this.places[count].lat + ' and longitude is '+this.places[count].lng); 
        if(this.latitude == this.places[count].lat && this.longitude == this.places[count].lng){ 
           this.pricehere = this.places[count].price; 
        }
      }
      this.displayRoute();
      this.storage.get('time').then((time) => {
        console.log('prev time is',time);
        this.storage.get('date').then((date) => {
          console.log(date);
          this.storage.get('lasttime').then((value1) => {
            console.log('distance traveled is ', this.distance);            
            /*this.time_diff = newtime.getTime() - value1.getTime();
            this.time_diff_minutes = Math.floor(this.time_diff/60000); //minutes
            this.time_diff = Math.floor(this.time_diff/3600000); //hours
            this.value_parking = (this.time_diff+1)*this.pricehere;*/
            console.log('price of parking is ',this.value_parking);
            //this.storage.set('timediff',time_diff)
            console.log('time difference in hours is ', this.time_diff);
            console.log('time difference in minutes is ', this.time_diff_minutes);        
            let marker = new google.maps.Marker({   
              map: this.map,   
              draggable: false,
              icon: image,    
              position: {lat: this.latitude, lng: this.longitude}  
            });  
            this.pSpot.push(marker);
            console.log(this.pSpot);         
            let infoWindow = new google.maps.InfoWindow({  
              content: "<b>You have parked here. </b><br><b>Date of Parking: </b>"+date+"<br><b>Time of Parking: </b>"+time+"<br><b>Distance from current location: </b>"+this.distance+" km"
            });   

            infoWindow.open(this.map, marker);
            marker.addListener('click', () => {
              infoWindow.open(this.map, marker);
            });
          })
        });
      });
    });   
});
}

displayRoute() {
  this.directionsDisplay.setMap(this.map);
  this.directionsService.route({
    origin:new google.maps.LatLng(this.currentLat, this.currentLng),
    destination: new google.maps.LatLng(this.latitude, this.longitude),
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status == 'OK') {
      this.directionsDisplay.setDirections(response);
      this.distance = 0;
      let myroute = response.routes[0];
      for (var mark = 0; mark < myroute.legs.length; mark++) {
        this.distance += myroute.legs[mark].distance.value;
      }
      this.distance = this.distance / 1000;
      console.log(this.distance);
    } 
    else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

testing(){ 
  console.log('clicked'); 
  console.log('..................................') 
} 

} 
