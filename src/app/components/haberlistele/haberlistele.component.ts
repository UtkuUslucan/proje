import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haber } from 'src/app/models/haber';
import { Sonuc } from 'src/app/models/sonucc';
import { FbservisService } from 'src/app/services/fbservis.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-haberlistele',
  templateUrl: './haberlistele.component.html',
  styleUrls: ['./haberlistele.component.css']
})
export class HaberlisteleComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  secHaber: Haber = new Haber();
  adsoyad: string;
  uid: string;
  haberler:any;
  constructor(
    public FbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.HaberListele();
  }

  OturumKapat() {
    this.FbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    });
  }

  HaberListele() {
    this.FbServis.HaberListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.haberler = data;
    });

  }

  HaberSil(haber: Haber) {
    this.FbServis.HaberSil(haber.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Haber başarıyla silindi!";
    })
  }
}