import { environment } from './../environments/environment';

import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmojiPipe } from './pipes/emoji.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FriendsComponent } from './components/friends/friends.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'perfil/:key', component: ProfileComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    EmojiPipe,
    SearchPipe,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
