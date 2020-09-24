import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the FbloginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FbloginProvider {
  /*action: any;
  fb_id: any;
  userName: any;
  emailid: any;*/
  
  constructor(public http: Http) {
    console.log('Hello FbloginProvider Provider');
    
  }
  fbloginfunc(fb_id,userName,emailid){
  	return new Promise(resolve => {
	  	this.http.get('http://websitetestingbox.com/php/parking/api/?action=facebook&facebook_id='+fb_id+'&username='+userName+'&email='+emailid)
	  		.map(res=> res.json())
	  		.subscribe(data1 => {
	  			/*console.log('data fblogin is ',data1.data);
	  			console.log('status is ',data1.status);
	  			console.log('status code is ',data1.status_code);
	  			console.log('ID is ',data1.data.id);
	  			console.log('Profile Pic is ',data1.data.profile_pic);
	  			console.log('created at ',data1.data.created_at); */
	  			resolve(data1);
	  		})
	})
  }

  loginfunc(email,pass){
  	return new Promise(resolve => {
	  	this.http.get('http://websitetestingbox.com/php/parking/api/?action=login&email='+email+'&password='+pass)
	  		.map(res=> res.json())
	  		.subscribe(data1 => {
	  			/*console.log('data login is ',data1.data);
	  			console.log('status is ',data1.status);
	  			console.log('status code is ',data1.status_code);
	  			console.log('ID is ',data1.data.id);
	  			console.log('Username is ',data1.data.username);*/

	  			resolve(data1);
	  		})
	})
  }

  profileUpdate(uid1){
  	return new Promise(resolve => {
	  	this.http.get('http://websitetestingbox.com/php/parking/api/?action=user&passing_value=get_profile&id='+uid1)
	  		.map(res=> res.json())
	  		.subscribe(data2 => {
	  			console.log('data at api get',data2.status);
	  			resolve(data2);
	  		})
	})
  	
  }

  profile(user,email,password,img,id){
  	return new Promise(resolve => {
	  	this.http.get('http://websitetestingbox.com/php/parking/api/?action=user&username='+user+'&email='+email+'&password='+password+'&profile_pic='+img+'&id='+id+'&role=2&dev=1&passing_value=update_profile')
	  		.map(res=> res.json())
	  		.subscribe(data3 => {
	  			console.log('data at api update',data3.status);
	  			resolve(data3);
	  		})
	})
  	
  }

}
