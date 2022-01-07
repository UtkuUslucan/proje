import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';
import { map } from 'rxjs/operators'
import { Uye } from 'src/app/models/uye';
import { Sonuc } from 'src/app/models/sonucc';
@Component({
  selector: 'app-hesapbilgilerim',
  templateUrl: './hesapbilgilerim.component.html',
  styleUrls: ['./hesapbilgilerim.component.css']
})
export class HesapbilgilerimComponent implements OnInit {
  adsoyad: string;
  uid: string;
  uyeler: any;
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  id = this.route.snapshot.queryParamMap.get('id');

  constructor(
    public FbServis: FbservisService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.UyeListele();
    this.secUye.key = null;
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
      this.uyeler = data.filter(x => x.uid == this.uid)[0];
    });
  }

  UyeDuzenle(uye: Uye) {
    Object.assign(this.secUye, uye);
  }

  Kaydet() {
    if (this.secUye.key == null) {
      this.FbServis.UyeEkle(this.secUye).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      })
    }
    else {
      this.FbServis.UyeDuzenle(this.secUye).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayit Düzenlendi";
      })
    }
  }
}