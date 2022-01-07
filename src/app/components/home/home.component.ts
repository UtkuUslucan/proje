import { map } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { Haber } from 'src/app/models/haber';
import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  haberler : any;
  kategori: "";
  constructor(
    public FbServis: FbservisService,
  ) { }
  
  ngOnInit() {
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
      this.haberler = data;
    });

  }
}
