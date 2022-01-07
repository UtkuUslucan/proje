import { HaberdetayComponent } from './components/haberdetay/haberdetay.component';
import { HaberlisteleComponent } from './components/haberlistele/haberlistele.component';
import { HesapbilgilerimComponent } from './components/hesapbilgilerim/hesapbilgilerim.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { HaberekleComponent } from './components/haberekle/haberekle.component';
import { AdminComponent } from './components/admin/admin.component';
import { IsbirligiComponent } from './components/isbirligi/isbirligi.component';
import { IletisimComponent } from './components/iletisim/iletisim.component';
import { YorumComponent } from './components/yorum/yorum.component';
import { SporComponent } from './components/spor/spor.component';
import { MuzikComponent } from './components/muzik/muzik.component';
import { EkonomiComponent } from './components/ekonomi/ekonomi.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test1Component } from './components/test1/test1.component';
import { Test2Component } from './components/test2/test2.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
    HomeComponent,
    EkonomiComponent,
    MuzikComponent,
    SporComponent,
    YorumComponent,
    IletisimComponent,
    IsbirligiComponent,
    AdminComponent,
    HaberekleComponent,
    UyelerComponent,
    LoginComponent,
    RegisterComponent,
    HesapbilgilerimComponent,
    HaberlisteleComponent,
    HaberdetayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
