import { FbservisService } from './services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  adsoyad:string;
  uid:string;
  kullaniciadi:string;
  title = 'proje';

  constructor (
    public FbServis: FbservisService,
    public router:Router
    ) { }

  ngOnInit() {
    var user=JSON.parse(localStorage.getItem("user"));
    this.uid=user.uid;
    this.adsoyad=user.displayName;

  }
  
  OturumKapat(){
    this.FbServis.OturumKapat().then(d=>{
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    });
    }
}


