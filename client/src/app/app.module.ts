import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';

/* Components */
import { NavbarComponent } from './components/menus/navbar/navbar.component';
import { SidebarPlayersComponent } from './components/menus/sidebar-players/sidebar-players.component';
import { SidebarScoreboardComponent } from './components/menus/sidebar-scoreboard/sidebar-scoreboard.component';
import { SignInModalComponent } from './components/menus/sign-in-modal/sign-in-modal.component';
import { RegistrationModalComponent } from './components/menus/registration-modal/registration-modal.component';
import { AlertBoxComponent } from './components/menus/alert-box/alert-box.component';
import { TimerComponent } from './components/counting_mania/timer/timer.component';
import { GameContainerComponent } from './components/menus/game-container/game-container.component';
import { CountingManiaComponent } from './components/counting_mania/counting-mania/counting-mania.component';

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
    AlertBoxComponent,
    TimerComponent,
    GameContainerComponent,
    CountingManiaComponent
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