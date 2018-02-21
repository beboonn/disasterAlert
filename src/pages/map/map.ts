import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, PolygonOptions, LatLng } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    this.loadMap();
    // this.markPolygon();
  }

  loadMap() {
    console.log("im here 1");
    try{
    let mapHTML = document.getElementById("map");
    let mapOptions : GoogleMapOptions = {
      controls :{
        myLocationButton : true
      }
    };
    this.map = this.googleMaps.create(mapHTML,mapOptions);  
    
    }
    catch(err){
      console.log(err);
    }
  }
    markPolygon(){
      let polygonOptions: PolygonOptions = {
        points : [new LatLng(13.8452023,100.5676336),
          new LatLng(13.8452023,100.5696336),
          new LatLng(13.8462023,100.5696336),
          new LatLng(13.8462023,100.5676336)]
      };
      this.map.addPolygon(polygonOptions).then(()=>{
  
      },(err)=>{
        console.log(err);
      });
    }
}
