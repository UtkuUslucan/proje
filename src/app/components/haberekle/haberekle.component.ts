import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haber } from 'src/app/models/haber';
import { Sonuc } from 'src/app/models/sonucc';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-haberekle',
  templateUrl: './haberekle.component.html',
  styleUrls: ['./haberekle.component.css']
})
export class HaberekleComponent implements OnInit {
  adsoyad: string;
  uid: string;
  sonuc: Sonuc = new Sonuc();
  secHaber: Haber = new Haber();

  constructor(
    public FbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.secHaber.key = null;
  }

  OturumKapat() {
    this.FbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    });
  }

  HaberEkle() {
    if (this.secHaber.key == null) {
      this.FbServis.HaberEkle(this.secHaber).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Haber başarıyla eklendi.";
        window.location.reload();
      });
    }
    else {
      this.sonuc.mesaj = "Haber eklenemedi!";
    }
  }

}
