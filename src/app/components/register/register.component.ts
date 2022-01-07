
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonucc';
import { Uye } from 'src/app/models/uye';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sonuc:Sonuc=new Sonuc();
  secUye: Uye = new Uye();
  constructor(
    public fbServis:FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  KayitYap() {
    this.fbServis.UyeOl(this.secUye).then(d=> {
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
    this.fbServis.UyeEkle(this.secUye).then(d=> {
      this.router.navigate(['/']).then(() => {window.location.reload();});
    })
  }

}
