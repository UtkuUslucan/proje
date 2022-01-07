import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  kategori = "magazin";
  haberler : any;
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