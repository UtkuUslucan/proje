import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-spor',
  templateUrl: './spor.component.html',
  styleUrls: ['./spor.component.css']
})
export class SporComponent implements OnInit {
  kategori = "spor";
  haberler: any;
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
      this.haberler = data.filter(x => x.haberkategorisi == this.kategori);
    });

  }
}
