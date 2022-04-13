import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {}
}

@NgModule({
	declarations: [
		AppComponent,
  		NavbarComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		SocketIoModule.forRoot(config), 
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }