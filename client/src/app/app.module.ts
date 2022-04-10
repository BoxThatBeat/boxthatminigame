import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentComponent } from './components/document/document.component';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {}
}

@NgModule({
	declarations: [
		AppComponent,
  		DocumentListComponent,
  		DocumentComponent 
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