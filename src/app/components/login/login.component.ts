import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonucc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sonuc:Sonuc=new Sonuc();
  constructor(
    public fbServis:FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail:string,parola:string) {
    this.fbServis.OturumAc(mail,parola).then(d=> {
      localStorage.setItem("user",JSON.stringify(d.user));
      this.router.navigate(['/']).then(() => {window.location.reload();});
    },err=> {
      this.sonuc.islem=false;
      this.sonuc.mesaj="E-Posta Adresi veya Parola Geçersizdir!";
    });
    
  }
}
