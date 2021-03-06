import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

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
import { BannerComponent } from './components/menus/banner/banner.component';
import { NumberDisplayComponent } from './components/counting_mania/number-display/number-display.component';
import { FormatMsTime } from './Pipes/format-ms-time.pipe';

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
    CountingManiaComponent,
    BannerComponent,
    NumberDisplayComponent,
    FormatMsTime
	],
	imports: [
		BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
		SocketIoModule.forRoot(config)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }