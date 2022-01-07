import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { map } from 'rxjs/operators'
import { Sonuc } from 'src/app/models/sonucc';
import { Haber } from 'src/app/models/haber';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-haberdetay',
  templateUrl: './haberdetay.component.html',
  styleUrls: ['./haberdetay.component.css']
})
export class HaberdetayComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  secHaber: Haber = new Haber();
  adsoyad: string;
  uid: string;
  haberler:any;
  haberdetay:any;
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
    this.HaberListele();
  }

  HaberListele() {
    this.FbServis.HaberListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.haberler = data.filter(x => x.haberid == this.id)[0];
    });

  }
}
