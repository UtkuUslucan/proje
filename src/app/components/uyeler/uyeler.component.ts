import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Sonuc } from 'src/app/models/sonucc';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.css']
})
export class UyelerComponent implements OnInit {
  uyeler: any;
  secUye: Uye = new Uye();
  adsoyad: string;
  uid: string;
  sonuc: Sonuc = new Sonuc();
  constructor(
    public FbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.UyeListele();
  }


  OturumKapat() {
    this.FbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    });
  }

  UyeListele() {
    this.FbServis.UyeListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.uyeler = data;
    });

  }

  UyeSil(uye: Uye) {
    this.FbServis.UyeSil(uye.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi!";
    })
  }


  KayitYap() {
    this.FbServis.UyeOl(this.secUye).then(d=> {
      d.user.updateProfile({
        displayName:this.secUye.adsoyad
      }).then();
      this.secUye.uid=d.user.uid;
      localStorage.setItem("user",JSON.stringify(d.user));
      this.UyeEkle();
    },err=> {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu Tekrar Deneyiniz!";
    });
  }
  UyeEkle() {
    this.FbServis.UyeEkle(this.secUye).then(d=> {
      this.router.navigate(['/uyeler']);
    })
  }
}
