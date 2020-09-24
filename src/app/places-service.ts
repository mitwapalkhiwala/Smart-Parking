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
    this.http.get('../map.json')
      .map(res => res.json().results)
      .subscribe(data => {
        for(var info =0; info<data.length;info++)
        {
           console.log('Name is',data[info].name); 
           console.log('Address is',data[info].vicinity); 
           console.log('Lattitude is ',data[info].geometry.location.lat); 
           console.log('Longitude is ',data[info].geometry.location.lng); 
          resolve(data);
        } 
      });
    });
  }
}