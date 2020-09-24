import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlacesServiceProvider {

  constructor(public http: Http) {
  } 
  load() {
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('https://api.parkwhiz.com/search/?lat=40.758896&lng=-73.985130&key=ec64cabbcadb9756cfc64b0ddab9aa4d4fe9805e')
      .map(res => res.json().parking_listings)
      .subscribe(data => {
       for(var info =0; info<data.length;info++)
        {
          console.log('Name is',data[info].location_name); 
          console.log('Address is',data[info].address); 
          console.log('City is ',data[info].city);
          console.log('State is ',data[info].state);
          console.log('Price for parking is ',data[info].price_formatted);
          console.log('Available slots are ',data[info].available_spots)
          console.log('Lattitude is ',data[info].lat); 
          console.log('Longitude is ',data[info].lng); 
          resolve(data);
        } 
        
      });
    });
  }
}