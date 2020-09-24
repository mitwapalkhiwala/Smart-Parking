import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { PeopleServiceProvider } from '../../providers/people-service/people-service'; 
/**
 * Generated class for the InfopagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-infopage',
  templateUrl: 'infopage.html',
})
export class InfopagePage {
	firstname: any;
	lastname: any;
	person: any;
	lat: any;
	lng: any;
	address: any;
	name: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private peopleService: PeopleServiceProvider) {
  	this.firstname = navParams.get("firstname");
    this.lastname = navParams.get("lastname");
    this.person = navParams.get("person");
    this.lat = navParams.get("latt");
    this.lng = navParams.get("long");
    this.address = navParams.get("address");
    this.name = navParams.get("name");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfopagePage');
  }

}
