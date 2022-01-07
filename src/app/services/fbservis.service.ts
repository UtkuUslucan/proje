import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Uye } from '../models/uye';
import { AngularFireAuth } from '@angular/fire/auth';
import { Haber } from '../models/haber';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbUye = '/Uyeler';
  private dbHaber = '/Haberler'
  uyeRef: AngularFireList<Uye> = null;
  haberRef: AngularFireList<Haber> = null;
  constructor(
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
  )
  {
  this.uyeRef = db.list(this.dbUye);
  this.haberRef = db.list(this.dbHaber);
  }

  OturumAc(mail:string, parola:string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  
  OturumKapat() {
    return this.afAuth.signOut();
  }

  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    }
    else{
      return false;
    }
    
  }

  OturumKontrol2() {
    if (localStorage.getItem("user")) {
      return false;
    }
    else{
      return true;
    }
  }


  /* Üye */
  UyeOl(uye:Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye:Uye) {
    return this.uyeRef.push(uye);
  }

  UyeListele() {
    return this.uyeRef;
  }

  UyeDuzenle(uye: Uye) {
    return this.uyeRef.update(uye.key, uye);
  }

  UyeSil(key: string) {
    return this.uyeRef.remove(key);
  }


  /* Haber */
  HaberEkle(haber:Haber) {
    haber.haberkapakfotograf = haber.haberkapakfotograf.replace('\\','/').replace('\\','/').split('/').pop();
    /* haber.habericerikfotograf = haber.habericerikfotograf.replace('\\','/').replace('\\','/').split('/').pop();*/
    return this.haberRef.push(haber);
  }

  HaberListele() {
    return this.haberRef;
  }

  HaberSil(key:string) {
    return this.haberRef.remove(key);
  }

}
