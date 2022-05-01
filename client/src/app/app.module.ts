import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarPlayersComponent } from './components/sidebar-players/sidebar-players.component';
import { SidebarScoreboardComponent } from './components/sidebar-scoreboard/sidebar-scoreboard.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {}
}

@NgModule({
	declarations: [
		AppComponent,
    NavbarComponent,
    SidebarPlayersComponent,
    SidebarScoreboardComponent,
    SignInModalComponent,
    RegistrationModalComponent,
    AlertBoxComponent
	],
	imports: [
		BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
		SocketIoModule.forRoot(config)
	],
	providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
	bootstrap: [AppComponent]
})
export class AppModule { }