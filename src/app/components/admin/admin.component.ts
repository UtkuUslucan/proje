import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adsoyad:string;
  uid:string;
  constructor(
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
