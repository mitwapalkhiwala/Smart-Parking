import { BrowserModule } from '@angular/platform-browser'; 
import { ErrorHandler, NgModule } from '@angular/core'; 
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'; 
import { SplashScreen } from '@ionic-native/splash-screen'; 
import { StatusBar } from '@ionic-native/status-bar'; 
import { Geolocation } from '@ionic-native/geolocation';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component'; 
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { PlacesServiceProvider } from '../providers/places-service/places-service'; 
import { IonicStorageModule } from '@ionic/storage';
import { InfopagePage } from '../pages/infopage/infopage'; 
import { Network } from '@ionic-native/network';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LoginPage } from '../pages/login/login';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SignupPage } from '../pages/signup/signup';
import { FbloginProvider } from '../providers/fblogin/fblogin';
import { ProfilePage } from '../pages/profile/profile';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [

    MyApp,
    HomePage,
    HistoryPage,
    InfopagePage,
    LoginPage,
    SignupPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    InfopagePage,
    LoginPage,
    SignupPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Geolocation,
    Camera,
    Network,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesServiceProvider,
    FbloginProvider
  ]
})
export class AppModule {}
